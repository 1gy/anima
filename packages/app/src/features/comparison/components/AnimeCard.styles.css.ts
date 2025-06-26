import { tokens } from "@1gy/anima-styles";
import { style } from "@vanilla-extract/css";

export const imageContainer = style({
	flexShrink: 0,
});

export const animeImage = style({
	borderRadius: tokens.borderRadius.md,
	objectFit: "cover",
	width: "85px",
	height: "120px",
});

export const animeTitle = style({
	margin: `0 0 ${tokens.spacing["2"]} 0`,
	fontSize: tokens.typography.fontSize.lg,
	fontWeight: tokens.typography.fontWeight.semibold,
	color: tokens.colors.text.primary,
	lineHeight: tokens.typography.lineHeight.tight,
});

export const averageScore = style({
	fontSize: tokens.typography.fontSize.sm,
	color: tokens.colors.primary["600"],
	fontWeight: tokens.typography.fontWeight.medium,
	marginBottom: tokens.spacing["4"],
});

export const userComparisonContainer = style({
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	gap: tokens.spacing["4"],
	borderTop: `1px solid ${tokens.colors.border.primary}`,
	paddingTop: tokens.spacing["4"],
	marginTop: tokens.spacing["4"],
});

export const userSection = style({
	padding: tokens.spacing["2"],
	backgroundColor: tokens.colors.background.tertiary,
	borderRadius: tokens.borderRadius.md,
});

export const userLabel = style({
	display: "block",
	fontSize: tokens.typography.fontSize.sm,
	fontWeight: tokens.typography.fontWeight.semibold,
	color: tokens.colors.text.secondary,
	marginBottom: tokens.spacing["1"],
});

export const userStat = style({
	fontSize: tokens.typography.fontSize.xs,
	color: tokens.colors.text.tertiary,
	margin: `${tokens.spacing["1"]} 0`,
});
