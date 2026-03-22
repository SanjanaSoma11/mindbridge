/** @type {import('next').NextConfig} */
const nextConfig = {
  // OneDrive / network folders: native file watchers often fail → dev server hangs on "Compiling…"
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 500,
        ignored: ["**/node_modules/**", "**/.git/**"],
      };
    }
    return config;
  },
  async headers() {
    // Allow Canvas / Instructure to embed the support UI in an iframe (LTI external tool).
    const frameAncestors =
      "frame-ancestors 'self' https://*.instructure.com https://*.canvaslms.com https://canvas.instructure.com";

    return [
      {
        source: "/embed",
        headers: [
          { key: "Content-Security-Policy", value: frameAncestors },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/embed/:path*",
        headers: [
          { key: "Content-Security-Policy", value: frameAncestors },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
