/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import { coverageConfigDefaults } from "vitest/config";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
// plugins
import react from "@vitejs/plugin-react";
import { powerAssert } from "rollup-plugin-power-assert";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		vanillaExtractPlugin(),
		powerAssert({ include: ["**/*.spec.{ts,tsx}"] }),
	],
	server: { host: true },
	test: {
		coverage: {
			enabled: true,
			provider: "v8",
			reportsDirectory: ".coverage",
			exclude: [
				"**/index.ts",
				"**/*.css.ts",
				"**/*.stories.{ts,tsx}",
				...coverageConfigDefaults.exclude,
			],
		},
		projects: [
			{
				// Unit tests
				extends: true,
				test: {
					name: "unit",
					environment: "node",
					include: ["**/*.unit.spec.{ts,tsx}"],
				},
			},
			{
				// Component tests
				extends: true,
				test: {
					name: "component",
					environment: "jsdom",
					include: ["**/*.component.spec.{ts,tsx}"],
				},
			},
			{
				// Integration tests
				extends: true,
				test: {
					name: "integration",
					environment: "jsdom",
					include: ["**/*.integration.spec.{ts,tsx}"],
				},
			},
		],
	},
});
