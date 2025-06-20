import { type RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { tokens } from "../../tokens.css";

export const inputStyle = recipe({
	base: {
		width: "100%",
		boxSizing: "border-box",
		fontFamily: tokens.typography.fontFamily.primary,
		fontSize: tokens.typography.fontSize.base,
		color: tokens.colors.text.primary,
		backgroundColor: tokens.colors.background.primary,
		borderRadius: tokens.borderRadius.md,
		border: `1px solid ${tokens.colors.border.primary}`,
		transition: `border-color ${tokens.transition.fast}, box-shadow ${tokens.transition.fast}`,
		outline: "none",

		":focus": {
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
	},
	variants: {
		size: {
			sm: {
				padding: `${tokens.spacing["2"]} ${tokens.spacing["3"]}`,
				fontSize: tokens.typography.fontSize.sm,
			},
			md: {
				padding: `${tokens.spacing["3"]} ${tokens.spacing["4"]}`,
				fontSize: tokens.typography.fontSize.base,
			},
			lg: {
				padding: `${tokens.spacing["4"]} ${tokens.spacing["5"]}`,
				fontSize: tokens.typography.fontSize.lg,
			},
		},
		state: {
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
		},
	},
	defaultVariants: {
		size: "md",
		state: "default",
	},
});

export const labelStyle = recipe({
	base: {
		display: "block",
		fontSize: tokens.typography.fontSize.sm,
		fontWeight: tokens.typography.fontWeight.medium,
		color: tokens.colors.text.primary,
		lineHeight: tokens.typography.lineHeight.normal,
		marginBottom: tokens.spacing["2"],
	},
	variants: {
		required: {
			true: {
				"::after": {
					content: " *",
					color: tokens.colors.error["500"],
				},
			},
		},
	},
});

export const formGroupStyle = recipe({
	base: {
		width: "100%",
		boxSizing: "border-box",
		marginBottom: tokens.spacing["4"],
	},
	variants: {
		spacing: {
			sm: {
				marginBottom: tokens.spacing["2"],
			},
			md: {
				marginBottom: tokens.spacing["4"],
			},
			lg: {
				marginBottom: tokens.spacing["6"],
			},
		},
	},
	defaultVariants: {
		spacing: "md",
	},
});

export const errorTextStyle = recipe({
	base: {
		fontSize: tokens.typography.fontSize.sm,
		color: tokens.colors.error["600"],
		marginTop: tokens.spacing["1"],
		lineHeight: tokens.typography.lineHeight.normal,
	},
});

export const helperTextStyle = recipe({
	base: {
		fontSize: tokens.typography.fontSize.sm,
		color: tokens.colors.text.tertiary,
		marginTop: tokens.spacing["1"],
		lineHeight: tokens.typography.lineHeight.normal,
	},
});

export type InputVariants = RecipeVariants<typeof inputStyle>;
export type LabelVariants = RecipeVariants<typeof labelStyle>;
export type FormGroupVariants = RecipeVariants<typeof formGroupStyle>;