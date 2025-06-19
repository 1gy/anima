import { type RecipeVariants, recipe } from "@vanilla-extract/recipes";

export const buttonStyle = recipe({
	base: {
		display: "inline-block",
		cursor: "pointer",
		border: 0,
		borderRadius: "3em",
		fontWeight: 700,
		lineHeight: 1,
	},
	variants: {
		variant: {
			primary: {
				backgroundColor: "#555ab9",
				color: "white",
			},
			secondary: {
				boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset",
				backgroundColor: "transparent",
				color: "#333",
			},
		},
		size: {
			medium: { padding: "11px 20px", fontSize: "14px" },
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "medium",
	},
});

export type ButtonVariants = RecipeVariants<typeof buttonStyle>;
