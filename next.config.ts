import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: "export",
  assetPrefix: isDev ? undefined : "https://yt4307.github.io/chulendar/",
};

export default nextConfig;
