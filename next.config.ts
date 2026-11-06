import type { NextConfig } from "next";
import { getSecurityHeaders } from "./lib/security-headers";

const nextConfig: NextConfig = {
  async headers() {
    const securityHeaders = getSecurityHeaders();
    
    return [
      {
        source: "/(.*)",
        headers: Object.entries(securityHeaders).map(([key, value]) => ({
          key,
          value,
        })),
      },
    ];
  },
};

export default nextConfig;