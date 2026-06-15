import type { NextConfig } from "next";
import { getBasePath } from "./src/lib/base-path";

const basePath = getBasePath();

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
