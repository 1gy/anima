// @ts-ignore - Storybook types not yet configured
import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";

const meta: Meta<typeof Input> = {
	title: "Components/Input",
	component: Input,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "radio" },
			options: ["sm", "md", "lg"],
		},
		state: {
			control: { type: "radio" },
			options: ["default", "error", "success"],
		},
		type: {
			control: { type: "text" },
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Enter text...",
	},
};

export const WithLabel: Story = {
	args: {
		label: "Username",
		placeholder: "Enter your username",
	},
};

export const Required: Story = {
	args: {
		label: "Email Address",
		placeholder: "Enter your email",
		required: true,
		type: "email",
	},
};

export const WithError: Story = {
	args: {
		label: "Password",
		placeholder: "Enter your password",
		type: "password",
		error: "Password must be at least 8 characters",
	},
};

export const WithHelperText: Story = {
	args: {
		label: "Username",
		placeholder: "Choose a username",
		helperText: "This will be your public display name",
	},
};

export const Success: Story = {
	args: {
		label: "Email",
		placeholder: "Enter your email",
		type: "email",
		state: "success",
		value: "user@example.com",
	},
};

export const Small: Story = {
	args: {
		label: "Small Input",
		placeholder: "Small size",
		size: "sm",
	},
};

export const Large: Story = {
	args: {
		label: "Large Input",
		placeholder: "Large size",
		size: "lg",
	},
};

export const Disabled: Story = {
	args: {
		label: "Disabled Input",
		placeholder: "Cannot edit",
		disabled: true,
	},
};
