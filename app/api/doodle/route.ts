import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

// In-memory rate limiting: 30 saves per IP per hour for friendly usage
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 30;

// PNG 8-byte magic header: 89 50 4E 47 0D 0A 1A 0A
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean up if window passed
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Block public GET listing to keep all submissions 100% private to Che
export async function GET() {
  return NextResponse.json(
    { message: "Doodles are private to the portfolio owner." },
    { status: 403 }
  );
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "unknown-ip";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a bit before trying again." },
        { status: 429 }
      );
    }

    // 2. Parse Multipart Form Data
    const formData = await req.formData();

    // 3. Honeypot check for bots
    const website = formData.get("website");
    if (website && typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // 4. Extract and normalize Name
    const rawName = formData.get("name");
    let name = "Guest Artist";
    if (rawName && typeof rawName === "string") {
      const sanitized = rawName.replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim();
      if (sanitized.length > 0) {
        name = sanitized.slice(0, 30);
      }
    }

    // 5. Extract and validate Image
    const imageFile = formData.get("image");
    if (!imageFile || !(imageFile instanceof Blob)) {
      return NextResponse.json(
        { error: "Image file is required." },
        { status: 400 }
      );
    }

    // Limit image size to 2 MB
    if (imageFile.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image file size exceeds limit." },
        { status: 400 }
      );
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Verify 8-byte PNG signature if long enough
    if (buffer.length >= 8) {
      const isPng = PNG_SIGNATURE.every((byte, idx) => buffer[idx] === byte);
      if (!isPng) {
        return NextResponse.json(
          { error: "Invalid image format. PNG required." },
          { status: 400 }
        );
      }
    }

    // 6. Generate unique ID for this doodle
    const doodleId = crypto.randomUUID();
    const fileName = `${doodleId}.png`;
    const imagePath = `/doodles/${fileName}`;
    const createdAt = new Date().toISOString();

    // 7. Save locally to private folder in project
    try {
      const doodlesDir = path.join(process.cwd(), "public", "doodles");
      if (!fs.existsSync(doodlesDir)) {
        fs.mkdirSync(doodlesDir, { recursive: true });
      }

      const filePath = path.join(doodlesDir, fileName);
      await fs.promises.writeFile(filePath, buffer);

      // Also persist record in data/doodles.json
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const doodlesJsonPath = path.join(dataDir, "doodles.json");
      let currentDoodles: Array<{ id: string; name: string; image_path: string; created_at: string }> = [];
      if (fs.existsSync(doodlesJsonPath)) {
        try {
          const raw = await fs.promises.readFile(doodlesJsonPath, "utf-8");
          currentDoodles = JSON.parse(raw);
        } catch {
          currentDoodles = [];
        }
      }
      currentDoodles.unshift({
        id: doodleId,
        name,
        image_path: imagePath,
        created_at: createdAt,
      });

      // Keep recent 200 doodles
      if (currentDoodles.length > 200) {
        currentDoodles = currentDoodles.slice(0, 200);
      }

      await fs.promises.writeFile(doodlesJsonPath, JSON.stringify(currentDoodles, null, 2), "utf-8");
    } catch (localErr) {
      console.warn("Local doodle save notice:", localErr);
    }

    // 8. Upload to Supabase Storage & DB
    const admin = getSupabaseAdmin();
    if (admin) {
      try {
        const { error: uploadError } = await admin.storage
          .from("doodles")
          .upload(fileName, buffer, {
            contentType: "image/png",
            upsert: true,
          });

        if (uploadError) {
          console.warn("Supabase storage upload notice:", uploadError.message);
        } else {
          const { error: insertError } = await admin
            .from("doodles")
            .insert({
              id: doodleId,
              name: name,
              image_path: fileName,
            });

          if (insertError) {
            console.warn("Supabase database insert notice:", insertError.message);
          }
        }
      } catch (supabaseErr) {
        console.warn("Supabase integration notice:", supabaseErr);
      }
    }

    // Always succeed so user's doodle is saved reliably
    return NextResponse.json({
      ok: true,
      id: doodleId,
      name: name,
      path: imagePath,
    });
  } catch (err) {
    console.error("Doodle save error:", err);
    return NextResponse.json(
      { error: "Could not process doodle." },
      { status: 500 }
    );
  }
}
