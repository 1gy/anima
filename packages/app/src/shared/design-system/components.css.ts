import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { mediaQuery, tokens } from "./tokens.css";

// Button component styles
export const buttonBase = style({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	padding: `${tokens.spacing["2"]} ${tokens.spacing["4"]}`,
	border: "none",
	borderRadius: tokens.borderRadius.lg,
	fontSize: tokens.typography.fontSize.base,
	fontWeight: tokens.typography.fontWeight.medium,
	fontFamily: tokens.typography.fontFamily.primary,
	cursor: "pointer",
	transition: `all ${tokens.transition.fast}`,
	textDecoration: "none",
	outline: "none",

	":focus": {
		outline: `2px solid ${tokens.colors.border.focus}`,
		outlineOffset: "2px",
	},

	":disabled": {
		cursor: "not-allowed",
		opacity: "0.6",
	},
});

export const buttonVariants = styleVariants({
	primary: {
		backgroundColor: tokens.colors.primary["500"],
		color: tokens.colors.text.inverse,

		":hover:not(:disabled)": {
			backgroundColor: tokens.colors.primary["600"],
			transform: "translateY(-1px)",
			boxShadow: tokens.boxShadow.md,
		},

		":active": {
			transform: "translateY(0)",
		},
	},
	secondary: {
		backgroundColor: tokens.colors.gray["500"],
		color: tokens.colors.text.inverse,

		":hover:not(:disabled)": {
			backgroundColor: tokens.colors.gray["600"],
			transform: "translateY(-1px)",
			boxShadow: tokens.boxShadow.md,
		},

		":active": {
			transform: "translateY(0)",
		},
	},
	outline: {
		backgroundColor: "transparent",
		color: tokens.colors.primary["600"],
		border: `1px solid ${tokens.colors.primary["500"]}`,

		":hover:not(:disabled)": {
			backgroundColor: tokens.colors.primary["50"],
			borderColor: tokens.colors.primary["600"],
		},
	},
	ghost: {
		backgroundColor: "transparent",
		color: tokens.colors.text.secondary,

		":hover:not(:disabled)": {
			backgroundColor: tokens.colors.gray["100"],
		},
	},
});

export const buttonSizes = styleVariants({
	sm: {
		padding: `${tokens.spacing["1"]} ${tokens.spacing["3"]}`,
		fontSize: tokens.typography.fontSize.sm,
	},
	md: {
		padding: `${tokens.spacing["2"]} ${tokens.spacing["4"]}`,
		fontSize: tokens.typography.fontSize.base,
	},
	lg: {
		padding: `${tokens.spacing["3"]} ${tokens.spacing["6"]}`,
		fontSize: tokens.typography.fontSize.lg,
	},
});

// Form component styles
export const formGroup = style({
	marginBottom: "0",
});

export const label = style({
	display: "block",
	marginBottom: tokens.spacing["2"],
	fontSize: tokens.typography.fontSize.sm,
	fontWeight: tokens.typography.fontWeight.medium,
	color: tokens.colors.text.primary,
	lineHeight: tokens.typography.lineHeight.normal,
});

export const inputBase = style({
	width: "100%",
	padding: `${tokens.spacing["3"]} ${tokens.spacing["4"]}`,
	border: `1px solid ${tokens.colors.border.primary}`,
	borderRadius: tokens.borderRadius.md,
	fontSize: tokens.typography.fontSize.base,
	fontFamily: tokens.typography.fontFamily.primary,
	color: tokens.colors.text.primary,
	backgroundColor: tokens.colors.background.primary,
	transition: `border-color ${tokens.transition.fast}, box-shadow ${tokens.transition.fast}`,

	":focus": {
		outline: "none",
		borderColor: tokens.colors.border.focus,
		boxShadow: `0 0 0 3px ${tokens.colors.primary["100"]}`,
	},

	":disabled": {
		backgroundColor: tokens.colors.background.tertiary,
		cursor: "not-allowed",
		color: tokens.colors.text.tertiary,
	},

	"::placeholder": {
		color: tokens.colors.text.tertiary,
	},
});

export const inputStates = styleVariants({
	default: {},
	error: {
		borderColor: tokens.colors.error["500"],

		":focus": {
			borderColor: tokens.colors.error["500"],
			boxShadow: `0 0 0 3px ${tokens.colors.error["100"]}`,
		},
	},
	success: {
		borderColor: tokens.colors.success["500"],

		":focus": {
			borderColor: tokens.colors.success["500"],
			boxShadow: `0 0 0 3px ${tokens.colors.success["100"]}`,
		},
	},
});

// Alert/Error message styles
export const alertBase = style({
	padding: `${tokens.spacing["3"]} ${tokens.spacing["4"]}`,
	borderRadius: tokens.borderRadius.md,
	fontSize: tokens.typography.fontSize.sm,
	fontWeight: tokens.typography.fontWeight.medium,
	marginBottom: tokens.spacing["4"],
});

export const alertVariants = styleVariants({
	error: {
		backgroundColor: tokens.colors.error["50"],
		color: tokens.colors.error["700"],
		border: `1px solid ${tokens.colors.error["200"]}`,
	},
	warning: {
		backgroundColor: tokens.colors.warning["50"],
		color: tokens.colors.warning["700"],
		border: `1px solid ${tokens.colors.warning["200"]}`,
	},
	success: {
		backgroundColor: tokens.colors.success["50"],
		color: tokens.colors.success["700"],
		border: `1px solid ${tokens.colors.success["200"]}`,
	},
	info: {
		backgroundColor: tokens.colors.primary["50"],
		color: tokens.colors.primary["700"],
		border: `1px solid ${tokens.colors.primary["200"]}`,
	},
});

// Card component styles
export const cardBase = style({
	backgroundColor: tokens.colors.background.primary,
	border: `1px solid ${tokens.colors.border.primary}`,
	borderRadius: tokens.borderRadius.xl,
	boxShadow: tokens.boxShadow.sm,
	transition: `box-shadow ${tokens.transition.fast}, transform ${tokens.transition.fast}`,
	width: "100%",
	maxWidth: "100%",
	boxSizing: "border-box",
});

export const cardVariants = styleVariants({
	default: {},
	hover: {
		":hover": {
			boxShadow: tokens.boxShadow.md,
			transform: "translateY(-2px)",
		},
	},
	interactive: {
		cursor: "pointer",

		":hover": {
			boxShadow: tokens.boxShadow.md,
			transform: "translateY(-2px)",
		},

		":active": {
			transform: "translateY(0)",
		},
	},
});

export const cardContent = style({
	padding: tokens.spacing["6"],
	width: "100%",
	boxSizing: "border-box",

	"@media": {
		[mediaQuery.md]: {
			padding: tokens.spacing["8"],
		},
	},
});

export const cardHeader = style({
	display: "flex",
	alignItems: "flex-start",
	gap: tokens.spacing["4"],
	marginBottom: tokens.spacing["4"],
});

export const cardTitle = style({
	fontSize: tokens.typography.fontSize.lg,
	fontWeight: tokens.typography.fontWeight.semibold,
	color: tokens.colors.text.primary,
	margin: 0,
	lineHeight: tokens.typography.lineHeight.tight,
});

export const cardDescription = style({
	fontSize: tokens.typography.fontSize.sm,
	color: tokens.colors.text.secondary,
	margin: 0,
	lineHeight: tokens.typography.lineHeight.normal,
});

// Layout component styles
export const container = style({
	width: "100%",
	maxWidth: "1200px",
	margin: "0 auto",
	padding: `0 ${tokens.spacing["4"]}`,

	"@media": {
		[mediaQuery.sm]: {
			padding: `0 ${tokens.spacing["6"]}`,
		},
		[mediaQuery.lg]: {
			padding: `0 ${tokens.spacing["8"]}`,
		},
	},
});

export const containerSizes = styleVariants({
	sm: {
		maxWidth: "640px",
	},
	md: {
		maxWidth: "768px",
	},
	lg: {
		maxWidth: "1024px",
	},
	xl: {
		maxWidth: "1280px",
	},
	"2xl": {
		maxWidth: "1536px",
	},
	full: {
		maxWidth: "100%",
	},
});

export const pageLayout = style({
	minHeight: "100vh",
	backgroundColor: tokens.colors.background.secondary,
	padding: `${tokens.spacing["8"]} ${tokens.spacing["4"]}`,
	boxSizing: "border-box",

	"@media": {
		[mediaQuery.md]: {
			padding: `${tokens.spacing["12"]} ${tokens.spacing["6"]}`,
		},
	},
});

export const pageTitle = style({
	fontSize: tokens.typography.fontSize["4xl"],
	fontWeight: tokens.typography.fontWeight.bold,
	color: tokens.colors.text.primary,
	textAlign: "center",
	margin: `0 0 ${tokens.spacing["12"]} 0`,
	lineHeight: tokens.typography.lineHeight.tight,

	"@media": {
		[mediaQuery.md]: {
			fontSize: tokens.typography.fontSize["5xl"],
		},
	},
});

// Grid system
export const grid = style({
	display: "grid",
	gap: tokens.spacing["4"],

	"@media": {
		[mediaQuery.md]: {
			gap: tokens.spacing["6"],
		},
		[mediaQuery.lg]: {
			gap: tokens.spacing["8"],
		},
	},
});

export const gridCols = styleVariants({
	1: { gridTemplateColumns: "repeat(1, 1fr)" },
	2: { gridTemplateColumns: "repeat(2, 1fr)" },
	3: { gridTemplateColumns: "repeat(3, 1fr)" },
	4: { gridTemplateColumns: "repeat(4, 1fr)" },
	auto: { gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" },
	autoLg: { gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" },
});

// Responsive grid variants
export const responsiveGrid = style({
	display: "grid",
	gap: tokens.spacing["4"],
	gridTemplateColumns: "1fr",

	"@media": {
		[mediaQuery.sm]: {
			gridTemplateColumns: "repeat(2, 1fr)",
			gap: tokens.spacing["6"],
		},
		[mediaQuery.lg]: {
			gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
			gap: tokens.spacing["8"],
		},
	},
});

// Text styles
export const textVariants = styleVariants({
	h1: {
		fontSize: tokens.typography.fontSize["4xl"],
		fontWeight: tokens.typography.fontWeight.bold,
		lineHeight: tokens.typography.lineHeight.tight,
		color: tokens.colors.text.primary,
	},
	h2: {
		fontSize: tokens.typography.fontSize["3xl"],
		fontWeight: tokens.typography.fontWeight.bold,
		lineHeight: tokens.typography.lineHeight.tight,
		color: tokens.colors.text.primary,
	},
	h3: {
		fontSize: tokens.typography.fontSize["2xl"],
		fontWeight: tokens.typography.fontWeight.semibold,
		lineHeight: tokens.typography.lineHeight.tight,
		color: tokens.colors.text.primary,
	},
	body: {
		fontSize: tokens.typography.fontSize.base,
		lineHeight: tokens.typography.lineHeight.normal,
		color: tokens.colors.text.primary,
	},
	small: {
		fontSize: tokens.typography.fontSize.sm,
		lineHeight: tokens.typography.lineHeight.normal,
		color: tokens.colors.text.secondary,
	},
	muted: {
		fontSize: tokens.typography.fontSize.sm,
		lineHeight: tokens.typography.lineHeight.normal,
		color: tokens.colors.text.tertiary,
	},
});

// Loading spinner
const spinAnimation = keyframes({
	"0%": { transform: "rotate(0deg)" },
	"100%": { transform: "rotate(360deg)" },
});

export const spinner = style({
	width: "20px",
	height: "20px",
	border: "2px solid transparent",
	borderTop: `2px solid ${tokens.colors.primary["500"]}`,
	borderRadius: "50%",
	animation: `${spinAnimation} 1s linear infinite`,
});

export const spinnerSizes = styleVariants({
	sm: { width: "16px", height: "16px" },
	md: { width: "20px", height: "20px" },
	lg: { width: "32px", height: "32px" },
});

// Flexbox utilities
export const flexBase = style({
	display: "flex",
});

export const flexVariants = styleVariants({
	row: { flexDirection: "row" },
	col: { flexDirection: "column" },
	wrap: { flexWrap: "wrap" },
	nowrap: { flexWrap: "nowrap" },
});

export const flexJustify = styleVariants({
	start: { justifyContent: "flex-start" },
	center: { justifyContent: "center" },
	end: { justifyContent: "flex-end" },
	between: { justifyContent: "space-between" },
	around: { justifyContent: "space-around" },
	evenly: { justifyContent: "space-evenly" },
});

export const flexAlign = styleVariants({
	start: { alignItems: "flex-start" },
	center: { alignItems: "center" },
	end: { alignItems: "flex-end" },
	stretch: { alignItems: "stretch" },
	baseline: { alignItems: "baseline" },
});

export const flexGap = styleVariants({
	1: { gap: tokens.spacing["1"] },
	2: { gap: tokens.spacing["2"] },
	3: { gap: tokens.spacing["3"] },
	4: { gap: tokens.spacing["4"] },
	6: { gap: tokens.spacing["6"] },
	8: { gap: tokens.spacing["8"] },
});
