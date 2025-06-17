// Global reset styles (must be imported first)
import "./reset.css";

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
