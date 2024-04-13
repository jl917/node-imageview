const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  minify: true,
  outfile: "./dist/index.js",
  platform: "node",
  alias: {
    "@": "./src/",
  },
});
