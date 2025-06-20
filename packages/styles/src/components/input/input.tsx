import type { FC, InputHTMLAttributes, ReactNode } from "react";

import { cx } from "../../utils";
import {
	type FormGroupVariants,
	type InputVariants,
	type LabelVariants,
	errorTextStyle,
	formGroupStyle,
	helperTextStyle,
	inputStyle,
	labelStyle,
} from "./input.css";

export type InputProps = InputVariants &
	Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size"> & {
		label?: string;
		labelProps?: LabelVariants;
		formGroupProps?: FormGroupVariants;
		error?: string;
		helperText?: string;
	};

export type LabelProps = LabelVariants & {
	children: ReactNode;
	htmlFor?: string;
	className?: string;
};

export type FormGroupProps = FormGroupVariants & {
	children: ReactNode;
	className?: string;
};

export const Input: FC<InputProps> = ({
	size,
	state,
	label,
	labelProps,
	formGroupProps,
	error,
	helperText,
	id,
	required,
	...props
}) => {
	const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
	const finalState = error ? "error" : state;

	const inputClassName = cx(inputStyle({ size, state: finalState }));

	const inputElement = (
		<input
			id={inputId}
			type="text"
			className={inputClassName}
			required={required}
			{...props}
		/>
	);

	// If no label, return just the input
	if (!label) {
		return inputElement;
	}

	// Return wrapped with label and form group
	return (
		<FormGroup {...formGroupProps}>
			<Label htmlFor={inputId} required={required} {...labelProps}>
				{label}
			</Label>
			{inputElement}
			{error && <div className={cx(errorTextStyle())}>{error}</div>}
			{helperText && !error && (
				<div className={cx(helperTextStyle())}>{helperText}</div>
			)}
		</FormGroup>
	);
};

export const Label: FC<LabelProps> = ({
	children,
	required,
	className,
	htmlFor,
	...props
}) => {
	const labelClassName = cx(labelStyle({ required }), className);

	return (
		<label className={labelClassName} htmlFor={htmlFor} {...props}>
			{children}
		</label>
	);
};

export const FormGroup: FC<FormGroupProps> = ({
	children,
	spacing,
	className,
	...props
}) => {
	const formGroupClassName = cx(formGroupStyle({ spacing }), className);

	return (
		<div className={formGroupClassName} {...props}>
			{children}
		</div>
	);
};
