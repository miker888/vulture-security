// Public URL of the deployed site. The GitHub Pages workflow sets
// NEXT_PUBLIC_SITE_URL to https://<owner>.github.io/<repo>; on the custom
// domain set it to https://vulturesecurity.ca.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
