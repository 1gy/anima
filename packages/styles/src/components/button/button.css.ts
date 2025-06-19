import { type RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { tokens } from "../../tokens.css";

export const buttonStyle = recipe({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		border: "none",
		borderRadius: tokens.borderRadius.lg,
		fontFamily: tokens.typography.fontFamily.primary,
		fontWeight: tokens.typography.fontWeight.medium,
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
	},
	variants: {
		variant: {
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
		},
		size: {
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
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

export type ButtonVariants = RecipeVariants<typeof buttonStyle>;
