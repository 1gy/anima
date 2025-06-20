import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

import { cx } from "../../utils";
import { type ButtonVariants, buttonStyle } from "./button.css";

export type ButtonProps = ButtonVariants &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
		children: ReactNode;
		asChild?: boolean;
	};

export const Button: FC<ButtonProps> = ({
	children,
	variant,
	size,
	asChild = false,
	...props
}) => {
	const className = cx(buttonStyle({ variant, size }));

	if (asChild) {
		// If asChild is true, expect children to be a single React element
		// and clone it with the button styles
		return children as React.ReactElement;
	}

	return (
		<button type="button" className={className} {...props}>
			{children}
		</button>
	);
};
