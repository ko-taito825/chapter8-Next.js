const { hostname } = require("os");

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.jp" },
      { protocol: "https", hostname: "images.microcms-assets.io" },
      { protocol: "https", hostname: "spwbrmttshszlhcwzzag.supabase.co" },
    ],
  },
};
module.exports = nextConfig;
