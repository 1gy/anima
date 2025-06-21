import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	logLevel: "error",
	stories: [
		// "../src/**/*.mdx",
		"../src/**/*.stories.@(ts|tsx)",
	],
	addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
};
export default config;
