import type { NextConfig } from "next";

// Static export, same setup as the Aspire site, served at the root of
// vulturesecurity.ca. NEXT_PUBLIC_BASE_PATH is only needed to preview the
// site under a sub-path such as https://<owner>.github.io/<repo>/.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
