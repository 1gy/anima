import { style } from "@vanilla-extract/css";
import { tokens } from "../../../shared/design-system";

export const clearButtonContainer = style({
	display: "flex",
	justifyContent: "center",
	margin: `${tokens.spacing["8"]} 0`,
});
