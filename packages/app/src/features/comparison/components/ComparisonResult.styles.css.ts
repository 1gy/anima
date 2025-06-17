import { style } from "@vanilla-extract/css";
import { mediaQuery, tokens } from "../../../shared/design-system";

export const pageContainer = style({
	width: "100%",
	maxWidth: "1000px",
	margin: "0 auto",
});

export const resultContainer = style({
	margin: `${tokens.spacing["8"]} 0`,
});

export const summaryStats = style({
	display: "grid",
	gap: tokens.spacing["3"],

	"@media": {
		"(max-width: 480px)": {
			gap: tokens.spacing["4"],
		},
	},
});

export const statLine = style({
	display: "grid",
	gridTemplateColumns: "auto 1fr",
	gap: tokens.spacing["2"],
	padding: `${tokens.spacing["1"]} 0`,
	alignItems: "start",

	"@media": {
		"(max-width: 640px)": {
			gridTemplateColumns: "1fr",
			gap: tokens.spacing["1"],
		},
	},
});

export const statLabel = style({
	fontWeight: tokens.typography.fontWeight.semibold,
	color: tokens.colors.text.secondary,
	flexShrink: 0,
	minWidth: "0",
	whiteSpace: "nowrap",

	"@media": {
		"(max-width: 640px)": {
			whiteSpace: "normal",
			wordBreak: "break-word",
		},
	},
});

export const statValue = style({
	color: tokens.colors.text.primary,
	textAlign: "right",
	wordBreak: "break-word",
	overflowWrap: "break-word",
	hyphens: "auto",

	"@media": {
		"(max-width: 640px)": {
			textAlign: "left",
		},
	},
});

export const loadingContainer = style({
	textAlign: "center",
	padding: `${tokens.spacing["12"]} ${tokens.spacing["4"]}`,
	color: tokens.colors.text.tertiary,
	fontSize: tokens.typography.fontSize.lg,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: tokens.spacing["4"],
});

export const noResultsContainer = style({
	textAlign: "center",
	padding: `${tokens.spacing["12"]} ${tokens.spacing["4"]}`,
	backgroundColor: tokens.colors.background.tertiary,
	borderRadius: tokens.borderRadius.xl,
	margin: `${tokens.spacing["8"]} auto`,
	maxWidth: "600px",
});

export const sectionTitle = style({
	fontSize: tokens.typography.fontSize["2xl"],
	fontWeight: tokens.typography.fontWeight.semibold,
	color: tokens.colors.text.primary,
	margin: `${tokens.spacing["8"]} 0 ${tokens.spacing["6"]} 0`,
	textAlign: "center",
});
