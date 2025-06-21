import { cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

import { Button } from "./button.tsx";

afterEach(() => {
	cleanup();
});

describe("Button", () => {
	it("should render a button with the correct text", async () => {
		// Arrange
		const screen = render(<Button>Click Me</Button>);
		// Act
		const button = await screen.findByRole("button");
		// Assert
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Click Me");
	});

	it("should call onClick when clicked", async () => {
		// Arrange
		const handleClick = vi.fn();
		const screen = render(<Button onClick={handleClick}>Click Me</Button>);
		const button = await screen.findByRole("button");
		// Act
		await userEvent.click(button);
		// Assert
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
