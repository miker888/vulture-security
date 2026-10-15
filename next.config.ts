import type { NextConfig } from "next";

// Static export, same setup as the Aspire site. GitHub Pages serves a project
// site from /<repo-name>/, so the deploy workflow sets NEXT_PUBLIC_BASE_PATH.
// Leave it empty once the site is on vulturesecurity.ca.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
