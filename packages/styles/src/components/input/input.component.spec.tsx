import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

import { FormGroup, Input, Label } from "./input";

afterEach(() => {
	cleanup();
});

describe("Input", () => {
	it("should render basic input", () => {
		render(<Input placeholder="Enter text" />);

		const input = screen.getByPlaceholderText("Enter text");
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("type", "text");
	});

	it("should render input with label", () => {
		render(<Input label="Username" placeholder="Enter username" />);

		const label = screen.getByText("Username");
		const input = screen.getByLabelText("Username");

		expect(label).toBeInTheDocument();
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("placeholder", "Enter username");
	});

	it("should show required indicator on label", () => {
		render(<Input label="Email" required />);

		const label = screen.getByText(/Email/);
		expect(label).toBeInTheDocument();
		// The required asterisk is added via CSS ::after, so we can't test it directly
		// but we can verify the required attribute is passed to the input
		const input = screen.getByLabelText("Email");
		expect(input).toHaveAttribute("required");
	});

	it("should display error message", () => {
		render(<Input label="Email" error="Invalid email address" />);

		expect(screen.getByText("Invalid email address")).toBeInTheDocument();
	});

	it("should display helper text", () => {
		render(
			<Input label="Password" helperText="Must be at least 8 characters" />,
		);

		expect(
			screen.getByText("Must be at least 8 characters"),
		).toBeInTheDocument();
	});

	it("should not show helper text when error is present", () => {
		render(
			<Input
				label="Password"
				error="Password too short"
				helperText="Must be at least 8 characters"
			/>,
		);

		expect(screen.getByText("Password too short")).toBeInTheDocument();
		expect(
			screen.queryByText("Must be at least 8 characters"),
		).not.toBeInTheDocument();
	});

	it("should handle user input", async () => {
		const user = userEvent.setup();
		render(<Input label="Username" />);

		const input = screen.getByLabelText("Username");
		await user.type(input, "testuser");

		expect(input).toHaveValue("testuser");
	});

	it("should be disabled when disabled prop is true", () => {
		render(<Input label="Username" disabled />);

		const input = screen.getByLabelText("Username");
		expect(input).toBeDisabled();
	});
});

describe("Label", () => {
	it("should render label with text", () => {
		render(<Label>Test Label</Label>);

		expect(screen.getByText("Test Label")).toBeInTheDocument();
	});

	it("should associate with input via htmlFor", () => {
		render(
			<>
				<Label htmlFor="test-input">Test Label</Label>
				<input id="test-input" />
			</>,
		);

		const label = screen.getByText("Test Label");
		const input = screen.getByLabelText("Test Label");

		expect(label).toBeInTheDocument();
		expect(input).toBeInTheDocument();
	});
});

describe("FormGroup", () => {
	it("should render children", () => {
		render(
			<FormGroup>
				<Label>Test Label</Label>
				<Input placeholder="Test Input" />
			</FormGroup>,
		);

		expect(screen.getByText("Test Label")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Test Input")).toBeInTheDocument();
	});
});
