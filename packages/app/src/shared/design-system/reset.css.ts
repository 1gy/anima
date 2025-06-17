import { globalStyle } from "@vanilla-extract/css";
import { tokens } from "./tokens.css";

// CSS Reset and Global Styles
// Ensures consistent behavior across all browsers and prevents overflow issues

// Apply box-sizing: border-box to all elements (Paul Irish approach)
globalStyle("*, *::before, *::after", {
	boxSizing: "border-box",
});

// Reset margins and padding
globalStyle("html, body", {
	margin: 0,
	padding: 0,
	height: "100%",
});

// Set consistent base font and color
globalStyle("html", {
	fontFamily: tokens.typography.fontFamily.primary,
	fontSize: tokens.typography.fontSize.base,
	lineHeight: tokens.typography.lineHeight.normal,
	color: tokens.colors.text.primary,
	backgroundColor: tokens.colors.background.primary,
	// Improve text rendering
	WebkitFontSmoothing: "antialiased",
	MozOsxFontSmoothing: "grayscale",
	textRendering: "optimizeLegibility",
});

// Reset body
globalStyle("body", {
	margin: 0,
	padding: 0,
	minHeight: "100vh",
	overflowX: "hidden", // Prevent horizontal scroll
});

// Reset heading margins
globalStyle("h1, h2, h3, h4, h5, h6", {
	margin: 0,
	fontWeight: "inherit",
});

// Reset paragraph margins
globalStyle("p", {
	margin: 0,
});

// Reset list styles
globalStyle("ul, ol", {
	margin: 0,
	padding: 0,
	listStyle: "none",
});

// Reset button styles
globalStyle("button", {
	border: "none",
	background: "none",
	padding: 0,
	margin: 0,
	font: "inherit",
	color: "inherit",
	cursor: "pointer",
});

// Reset form element styles
globalStyle("input, textarea, select", {
	font: "inherit",
	color: "inherit",
	border: "none",
	background: "none",
	padding: 0,
	margin: 0,
});

// Remove default focus outlines (we'll add custom ones in components)
globalStyle("*:focus", {
	outline: "none",
});

// Reset link styles
globalStyle("a", {
	color: "inherit",
	textDecoration: "none",
});

// Reset table styles
globalStyle("table", {
	borderCollapse: "collapse",
	borderSpacing: 0,
});

// Reset img styles - prevent overflow
globalStyle("img", {
	maxWidth: "100%",
	height: "auto",
	display: "block",
});

// Reset fieldset and legend
globalStyle("fieldset", {
	border: "none",
	margin: 0,
	padding: 0,
});

globalStyle("legend", {
	padding: 0,
});

// Ensure flex and grid children don't overflow by default
globalStyle("[style*='display: flex'] > *, [style*='display: grid'] > *", {
	minWidth: 0,
	minHeight: 0,
});

// Utility class for screen readers
globalStyle(".sr-only", {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: 0,
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	border: 0,
});
