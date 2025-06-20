import { createGlobalTheme } from "@vanilla-extract/css";

export const tokens = createGlobalTheme(":root", {
	colors: {
		// Primary colors
		primary: {
			"50": "#eff6ff",
			"100": "#dbeafe",
			"200": "#bfdbfe",
			"300": "#93c5fd",
			"400": "#60a5fa",
			"500": "#3b82f6", // Main primary
			"600": "#2563eb",
			"700": "#1d4ed8",
			"800": "#1e40af",
			"900": "#1e3a8a",
		},
		// Gray scale
		gray: {
			"50": "#f9fafb",
			"100": "#f3f4f6",
			"200": "#e5e7eb",
			"300": "#d1d5db",
			"400": "#9ca3af",
			"500": "#6b7280",
			"600": "#4b5563",
			"700": "#374151",
			"800": "#1f2937",
			"900": "#111827",
		},
		// Semantic colors
		success: {
			"50": "#f0fdf4",
			"100": "#dcfce7",
			"200": "#bbf7d0",
			"500": "#22c55e",
			"600": "#16a34a",
			"700": "#15803d",
		},
		warning: {
			"50": "#fffbeb",
			"100": "#fef3c7",
			"200": "#fed7aa",
			"500": "#f59e0b",
			"600": "#d97706",
			"700": "#b45309",
		},
		error: {
			"50": "#fef2f2",
			"100": "#fee2e2",
			"200": "#fecaca",
			"500": "#ef4444",
			"600": "#dc2626",
			"700": "#b91c1c",
		},
		// Background colors
		background: {
			primary: "#ffffff",
			secondary: "#f8f9fa",
			tertiary: "#f3f4f6",
		},
		// Text colors
		text: {
			primary: "#111827",
			secondary: "#374151",
			tertiary: "#6b7280",
			inverse: "#ffffff",
		},
		// Border colors
		border: {
			primary: "#e5e7eb",
			secondary: "#d1d5db",
			focus: "#3b82f6",
		},
	},
	typography: {
		fontFamily: {
			primary:
				"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
			mono: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, monospace",
		},
		fontSize: {
			xs: "0.75rem", // 12px
			sm: "0.875rem", // 14px
			base: "1rem", // 16px
			lg: "1.125rem", // 18px
			xl: "1.25rem", // 20px
			"2xl": "1.5rem", // 24px
			"3xl": "1.875rem", // 30px
			"4xl": "2.25rem", // 36px
			"5xl": "3rem", // 48px
		},
		fontWeight: {
			normal: "400",
			medium: "500",
			semibold: "600",
			bold: "700",
		},
		lineHeight: {
			tight: "1.25",
			normal: "1.5",
			relaxed: "1.75",
		},
	},
	spacing: {
		"0": "0",
		"1": "0.25rem", // 4px
		"2": "0.5rem", // 8px
		"3": "0.75rem", // 12px
		"4": "1rem", // 16px
		"5": "1.25rem", // 20px
		"6": "1.5rem", // 24px
		"8": "2rem", // 32px
		"10": "2.5rem", // 40px
		"12": "3rem", // 48px
		"16": "4rem", // 64px
		"20": "5rem", // 80px
		"24": "6rem", // 96px
	},
	borderRadius: {
		none: "0",
		sm: "0.125rem", // 2px
		base: "0.25rem", // 4px
		md: "0.375rem", // 6px
		lg: "0.5rem", // 8px
		xl: "0.75rem", // 12px
		"2xl": "1rem", // 16px
		full: "9999px",
	},
	boxShadow: {
		sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
		base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
		md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
		lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
		xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
		inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
		none: "none",
	},
	transition: {
		fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
		normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
		slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
	},
});

// Breakpoints for responsive design
export const breakpoints = {
	sm: 640, // 640px
	md: 768, // 768px
	lg: 1024, // 1024px
	xl: 1280, // 1280px
	"2xl": 1536, // 1536px
} as const;

// Media query helpers
export const mediaQuery = {
	sm: `screen and (min-width: ${breakpoints.sm}px)`,
	md: `screen and (min-width: ${breakpoints.md}px)`,
	lg: `screen and (min-width: ${breakpoints.lg}px)`,
	xl: `screen and (min-width: ${breakpoints.xl}px)`,
	"2xl": `screen and (min-width: ${breakpoints["2xl"]}px)`,
} as const;
