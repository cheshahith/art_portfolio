import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    qualities: [75, 80],
  },
  experimental: {
    cpus: 1,
  },
  async redirects() {
    return [
      {
        source: "/worst-art",
        destination: "/ugly",
        permanent: true,
      },
      {
        source: "/worst",
        destination: "/ugly",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
