import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: {
    // tsup injects `baseUrl` when emitting declarations, which TypeScript 6
    // flags as deprecated.
    compilerOptions: { ignoreDeprecations: "6.0" },
  },
  sourcemap: true,
  clean: true,
  minify: true,
  external: ["react"],
});
