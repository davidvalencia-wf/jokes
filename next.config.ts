import type { NextConfig } from "next";
import userConfig from "./cosmicuser.next.config";

const webflowOverrides: NextConfig = {
  basePath: "/app",
};

const nextConfig: NextConfig = {
  ...userConfig,
  ...webflowOverrides,
};

export default nextConfig;
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
