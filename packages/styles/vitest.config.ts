import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
	plugins: [react(), vanillaExtractPlugin()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./vitest.shims.d.ts"],
	},
});