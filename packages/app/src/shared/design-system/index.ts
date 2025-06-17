// Design tokens
export { tokens, breakpoints, mediaQuery } from "./tokens.css";

// Component styles
export {
	// Button styles
	buttonBase,
	buttonVariants,
	buttonSizes,
	// Form styles
	formGroup,
	label,
	inputBase,
	inputStates,
	// Alert styles
	alertBase,
	alertVariants,
	// Card styles
	cardBase,
	cardVariants,
	cardContent,
	cardHeader,
	cardTitle,
	cardDescription,
	// Layout styles
	container,
	containerSizes,
	pageLayout,
	pageTitle,
	// Grid styles
	grid,
	gridCols,
	responsiveGrid,
	// Text styles
	textVariants,
	// Loading styles
	spinner,
	spinnerSizes,
	// Flex utilities
	flexBase,
	flexVariants,
	flexJustify,
	flexAlign,
	flexGap,
} from "./components.css";

// Style composition helpers
export const composeStyles = (...styles: (string | undefined)[]) => {
	return styles.filter(Boolean).join(" ");
};

// Common style combinations
export const button = (
	variant: keyof typeof buttonVariants = "primary",
	size: keyof typeof buttonSizes = "md",
) => {
	return composeStyles(buttonBase, buttonVariants[variant], buttonSizes[size]);
};

export const input = (state: keyof typeof inputStates = "default") => {
	return composeStyles(inputBase, inputStates[state]);
};

export const alert = (variant: keyof typeof alertVariants) => {
	return composeStyles(alertBase, alertVariants[variant]);
};

export const card = (variant: keyof typeof cardVariants = "default") => {
	return composeStyles(cardBase, cardVariants[variant]);
};

export const containerWithSize = (size: keyof typeof containerSizes = "lg") => {
	return composeStyles(container, containerSizes[size]);
};

export const gridWithCols = (cols: keyof typeof gridCols) => {
	return composeStyles(grid, gridCols[cols]);
};

export const flex = (
	direction: keyof typeof flexVariants = "row",
	justify: keyof typeof flexJustify = "start",
	align: keyof typeof flexAlign = "start",
	gap: keyof typeof flexGap = "4",
) => {
	return composeStyles(
		flexBase,
		flexVariants[direction],
		flexJustify[justify],
		flexAlign[align],
		flexGap[gap],
	);
};
