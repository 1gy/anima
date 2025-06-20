import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), vanillaExtractPlugin()],
	server: {
		host: "0.0.0.0",
		port: 5173,
	},
});
