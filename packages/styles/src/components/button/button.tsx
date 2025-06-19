import type { FC, ReactNode } from "react";

import { cx } from "../../utils";
import { type ButtonVariants, buttonStyle } from "./button.css";

export type ButtonProps = ButtonVariants & {
	children: ReactNode;
	onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({ children, onClick, ...variants }) => {
	return (
		<button
			type="button"
			className={cx(buttonStyle(variants))}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
