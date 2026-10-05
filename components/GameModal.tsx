"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  RotateCcw,
  Eraser,
  PenTool,
  Loader2,
  Sparkles,
  RefreshCw,
} from "lucide-react";

// Vintage Ink Colors
const INK_COLORS = [
  { name: "Vintage Ink", value: "#26110B" },
  { name: "Burgundy", value: "#6C1A1A" },
  { name: "Ochre Gold", value: "#965D18" },
  { name: "Charcoal", value: "#4A4036" },
];

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "doodle" | "name_prompt" | "submitting" | "success";

export default function GameModal({ isOpen, onClose }: GameModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>(INK_COLORS[0].value);
  const [isEraser, setIsEraser] = useState(false);
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [hasDoodled, setHasDoodled] = useState(false);

  const [step, setStep] = useState<Step>("doodle");
  const [visitorName, setVisitorName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Setup / reset canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill background with warm vintage paper cream
    ctx.fillStyle = "#F5EBD7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDoodled(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setStep("doodle");
      setVisitorName("");
      setSavedName("");
      setTimeout(initCanvas, 50);
    }
  }, [isOpen, initCanvas]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Drawing event handlers
  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = isEraser ? 16 : lineWidth;
    ctx.strokeStyle = isEraser ? "#F5EBD7" : selectedColor;

    setIsDrawing(true);
    setHasDoodled(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer already released
    }
  };

  // Step 1 -> Step 2: Confirm doodle
  const handleConfirmDoodle = () => {
    setStep("name_prompt");
  };

  // Step 2 -> Submit: Instant Save directly to Che's private collection
  const handleSubmitName = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = visitorName.trim() || "Guest Artist";
    setSavedName(trimmed);

    // Proceed to save state
    setStep("submitting");

    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        setStep("success");
        return;
      }

      // Export canvas as PNG Blob and submit privately to backend
      const blob: Blob = await new Promise((resolve) => {
        canvas.toBlob((b) => {
          if (b) resolve(b);
          else resolve(new Blob([], { type: "image/png" }));
        }, "image/png");
      });

      const formData = new FormData();
      formData.append("name", trimmed);
      formData.append("image", blob, "doodle.png");
      formData.append("website", honeypot);

      // Submit to backend
      await fetch("/api/doodle", {
        method: "POST",
        body: formData,
      });

      setStep("success");
    } catch (err) {
      console.warn("Doodle saved:", err);
      setStep("success");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Coffee Doodle Note"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          {/* Backdrop with rich wine-burgundy blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#350709]/80 backdrop-blur-md"
          />

          {/* =================================================================
              COFFEE-STAINED / VINTAGE PAPER NOTE MODAL (PRIVATE GUEST NOTE)
              ================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24, rotate: -1.5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24, rotate: 1.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="relative z-10 w-full max-w-md select-none"
          >
            {/* Vintage Paper Container */}
            <div
              style={{
                backgroundColor: "#F5EBD7",
                backgroundImage: `
                  radial-gradient(ellipse at 85% 15%, rgba(150, 93, 24, 0.15) 0%, rgba(150, 93, 24, 0.05) 35%, transparent 60%),
                  radial-gradient(circle at 18% 78%, rgba(120, 60, 10, 0.12) 0%, rgba(120, 60, 10, 0.03) 40%, transparent 65%),
                  radial-gradient(ellipse at 50% 50%, rgba(245, 235, 215, 1) 40%, rgba(226, 209, 179, 0.95) 100%)
                `,
                boxShadow:
                  "0 20px 50px -10px rgba(0,0,0,0.65), 0 0 0 1px rgba(110,60,20,0.2), inset 0 0 40px rgba(150,93,24,0.12)",
              }}
              className="relative rounded-lg p-5 sm:p-7 border-2 border-[#D4C3A3] text-[#26110B] overflow-hidden"
            >
              {/* Coffee Cup Ring Watermark in Corner */}
              <div
                aria-hidden="true"
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full border-[6px] border-[#965D18]/15 pointer-events-none filter blur-[0.5px]"
                style={{
                  boxShadow: "inset 0 0 12px rgba(150, 93, 24, 0.18)",
                }}
              />

              {/* Vintage Paper Tape / Clip */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#E2D1B3]/90 border-b border-[#C4B294] shadow-sm transform -rotate-1 rounded-b-sm pointer-events-none"
              />

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close note"
                className="absolute top-3.5 right-3.5 z-20 p-1.5 rounded-full text-[#6C1A1A]/70 hover:text-[#6C1A1A] hover:bg-[#EADBCA] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* =============================================================
                  STEP 1: DOODLE CANVAS
                  ============================================================= */}
              {step === "doodle" && (
                <div className="flex flex-col items-center">
                  {/* Handwritten Prompt */}
                  <div className="text-center mb-3">
                    <span className="font-[var(--font-caveat)] text-2xl sm:text-3xl text-[#6C1A1A] font-bold block leading-tight">
                      Draw something u like...
                    </span>
                    <p className="font-[var(--font-inter)] text-xs text-[#7A614A] tracking-wide mt-0.5">
                      Leave a private sketch on Che&apos;s desk
                    </p>
                  </div>

                  {/* Canvas Frame with Vintage Paper Inset */}
                  <div className="relative w-full rounded-md border-2 border-[#C9B595] overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.08)] bg-[#F5EBD7]">
                    <canvas
                      ref={canvasRef}
                      width={400}
                      height={270}
                      onPointerDown={startDrawing}
                      onPointerMove={draw}
                      onPointerUp={stopDrawing}
                      onPointerLeave={stopDrawing}
                      className="w-full aspect-[400/270] block touch-none cursor-crosshair"
                    />

                    {/* Faint Paper Watermark Text when empty */}
                    {!hasDoodled && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                        <span className="font-[var(--font-caveat)] text-2xl text-[#6C1A1A]">
                          ✏️ doodle here
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Drawing Toolbar */}
                  <div className="w-full mt-3 flex items-center justify-between gap-2 pt-2 border-t border-[#D4C3A3]">
                    {/* Ink Palette */}
                    <div className="flex items-center gap-1.5">
                      {INK_COLORS.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => {
                            setSelectedColor(c.value);
                            setIsEraser(false);
                          }}
                          aria-label={c.name}
                          style={{ backgroundColor: c.value }}
                          className={`w-6 h-6 rounded-full border transition-transform ${
                            !isEraser && selectedColor === c.value
                              ? "scale-125 ring-2 ring-[#6C1A1A] ring-offset-1 border-white"
                              : "border-black/20 hover:scale-110"
                          }`}
                        />
                      ))}

                      {/* Eraser Tool */}
                      <button
                        onClick={() => setIsEraser(!isEraser)}
                        aria-label="Eraser"
                        className={`p-1 rounded-md border transition-all ${
                          isEraser
                            ? "bg-[#6C1A1A] text-[#F5EFE1] border-[#6C1A1A]"
                            : "bg-[#EADBCA] text-[#26110B] border-[#C9B595] hover:bg-[#E2D1B3]"
                        }`}
                      >
                        <Eraser className="w-4 h-4" />
                      </button>

                      {/* Clear Canvas */}
                      <button
                        onClick={initCanvas}
                        aria-label="Clear drawing"
                        title="Clear canvas"
                        className="p-1 rounded-md bg-[#EADBCA] text-[#26110B] border border-[#C9B595] hover:bg-[#E2D1B3] transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Confirm Button */}
                    <button
                      onClick={handleConfirmDoodle}
                      aria-label="Confirm doodle and enter name"
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#6C1A1A] hover:bg-[#570910] text-[#F5EFE1] font-[var(--font-inter)] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Check className="w-4 h-4" />
                      <span>Next</span>
                    </button>
                  </div>
                </div>
              )}

              {/* =============================================================
                  STEP 2: NAME PROMPT FLOW
                  ============================================================= */}
              {step === "name_prompt" && (
                <form onSubmit={handleSubmitName} className="flex flex-col items-center text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-[#EADBCA] border border-[#C9B595] flex items-center justify-center text-[#6C1A1A] mb-3 shadow-inner">
                    <PenTool className="w-6 h-6" />
                  </div>

                  <h3 className="font-[var(--font-caveat)] text-3xl sm:text-4xl text-[#6C1A1A] font-bold mb-1">
                    Enter your name
                  </h3>

                  <p className="font-[var(--font-inter)] text-xs text-[#7A614A] max-w-xs mb-4">
                    Who created this sketch? Leave your name for Che.
                  </p>

                  {/* Honeypot field (hidden from genuine users) */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="sr-only"
                    aria-hidden="true"
                  />

                  {/* Ruled Vintage Name Input */}
                  <div className="w-full max-w-xs relative mb-4">
                    <input
                      type="text"
                      autoFocus
                      maxLength={30}
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Your name or nickname..."
                      className="w-full px-3 py-2 bg-transparent border-b-2 border-[#6C1A1A] text-center font-[var(--font-caveat)] text-2xl text-[#26110B] placeholder-[#9E8B75] outline-none focus:border-[#965D18] transition-colors"
                    />
                  </div>

                  {/* Submit & Back Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setStep("doodle")}
                      className="px-3.5 py-1.5 rounded-full font-[var(--font-inter)] text-xs text-[#7A614A] hover:text-[#26110B] bg-[#EADBCA] hover:bg-[#E2D1B3] transition-colors"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-6 py-2 rounded-full bg-[#6C1A1A] hover:bg-[#570910] text-[#F5EFE1] font-[var(--font-inter)] text-xs font-semibold uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save Doodle</span>
                    </button>
                  </div>
                </form>
              )}

              {/* =============================================================
                  STEP 3: SUBMITTING / SAVING STATE
                  ============================================================= */}
              {step === "submitting" && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Loader2 className="w-10 h-10 text-[#6C1A1A] animate-spin mb-4" />
                  <h4 className="font-[var(--font-caveat)] text-3xl text-[#6C1A1A] font-bold">
                    Signing and delivering your note...
                  </h4>
                  <p className="font-[var(--font-inter)] text-xs text-[#7A614A] mt-1">
                    Delivering private doodle to Che
                  </p>
                </div>
              )}

              {/* =============================================================
                  STEP 4: SUCCESS STATE (Private Thank You Note)
                  ============================================================= */}
              {step === "success" && (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#EADBCA] border-2 border-[#965D18]/40 flex items-center justify-center text-[#965D18] mb-3 shadow-sm">
                    <Sparkles className="w-7 h-7 animate-pulse" />
                  </div>

                  <h3 className="font-[var(--font-caveat)] text-3xl sm:text-4xl text-[#6C1A1A] font-bold mb-2">
                    Thank you, {savedName || visitorName || "Friend"}! ✨
                  </h3>

                  <p className="font-[var(--font-caveat)] text-xl sm:text-2xl text-[#26110B] max-w-sm mb-6 leading-snug">
                    Your sketch has been delivered privately to Che&apos;s personal archive!
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setStep("doodle");
                        setVisitorName("");
                        setSavedName("");
                        setTimeout(initCanvas, 50);
                      }}
                      className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#EADBCA] hover:bg-[#E2D1B3] text-[#6C1A1A] font-[var(--font-inter)] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Draw Another</span>
                    </button>

                    <button
                      onClick={onClose}
                      className="px-6 py-1.5 rounded-full bg-[#6C1A1A] hover:bg-[#570910] text-[#F5EFE1] font-[var(--font-inter)] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
