import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "img-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'"}`,
  "connect-src 'self' https://api.paystack.co",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.paystack.com",
].join("; ");

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Content-Security-Policy", value: contentSecurityPolicy },
      ],
    }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
