import { style } from "@vanilla-extract/css";
import { tokens } from "@1gy/anima-styles";

export const clearButtonContainer = style({
	display: "flex",
	justifyContent: "center",
	margin: `${tokens.spacing["8"]} 0`,
});
