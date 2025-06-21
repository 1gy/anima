import { style } from "@vanilla-extract/css";
import { mediaQuery, tokens } from "@1gy/anima-styles";

export const formContainer = style({
	width: "100%",
	maxWidth: "600px",
	margin: "0 auto",
	boxSizing: "border-box",

	"@media": {
		[mediaQuery.lg]: {
			maxWidth: "800px",
		},
	},
});

export const fieldsContainer = style({
	display: "flex",
	flexDirection: "column",
	gap: tokens.spacing["6"],

	"@media": {
		[mediaQuery.md]: {
			flexDirection: "row",
		},
	},
});

export const fieldWrapper = style({
	flex: 1,
});
