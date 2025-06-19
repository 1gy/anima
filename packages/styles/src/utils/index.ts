export { cx } from "./cx.ts";

// Style composition helper
export const composeStyles = (...styles: (string | undefined)[]) => {
	return styles.filter(Boolean).join(" ");
};
