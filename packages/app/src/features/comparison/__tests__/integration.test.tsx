import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ComparisonPage } from "../components/ComparisonPage";

describe.skip("Anime Comparison Integration", () => {
	beforeEach(() => {
		// Clear any existing state before each test
	});

	it("should complete successful comparison workflow", async () => {
		const user = userEvent.setup();

		render(<ComparisonPage />);

		// Verify initial state
		expect(screen.getByText("Anime Comparison")).toBeInTheDocument();
		expect(screen.getByLabelText(/first anilist user id/i)).toBeInTheDocument();
		expect(
			screen.getByLabelText(/second anilist user id/i),
		).toBeInTheDocument();

		// Enter user IDs
		await user.type(
			screen.getByLabelText(/first anilist user id/i),
			"testuser1",
		);
		await user.type(
			screen.getByLabelText(/second anilist user id/i),
			"testuser2",
		);

		// Submit comparison
		await user.click(
			screen.getByRole("button", { name: /compare anime lists/i }),
		);

		// Wait for results (skip checking loading state as it might be too fast)
		await waitFor(
			() => {
				expect(screen.getByText(/comparison summary/i)).toBeInTheDocument();
			},
			{ timeout: 5000 },
		);

		// Verify results are displayed
		expect(screen.getByText(/testuser1/)).toBeInTheDocument();
		expect(screen.getByText(/testuser2/)).toBeInTheDocument();
		expect(screen.getByText(/common anime/i)).toBeInTheDocument();
		expect(screen.getByText(/similarity score/i)).toBeInTheDocument();

		// Verify common anime is shown
		expect(screen.getByText(/attack on titan/i)).toBeInTheDocument();

		// Verify clear button appears
		expect(
			screen.getByRole("button", { name: /clear results/i }),
		).toBeInTheDocument();
	});

	it("should handle API errors gracefully", async () => {
		const user = userEvent.setup();

		render(<ComparisonPage />);

		// Enter invalid user ID that triggers error
		await user.type(
			screen.getByLabelText(/first anilist user id/i),
			"erroruser",
		);
		await user.type(
			screen.getByLabelText(/second anilist user id/i),
			"testuser2",
		);

		await user.click(
			screen.getByRole("button", { name: /compare anime lists/i }),
		);

		// Wait for error message
		await waitFor(
			() => {
				expect(screen.getByRole("alert")).toBeInTheDocument();
				expect(screen.getByText(/user not found/i)).toBeInTheDocument();
			},
			{ timeout: 5000 },
		);
	});

	it("should handle empty anime lists", async () => {
		const user = userEvent.setup();

		render(<ComparisonPage />);

		await user.type(
			screen.getByLabelText(/first anilist user id/i),
			"emptyuser",
		);
		await user.type(
			screen.getByLabelText(/second anilist user id/i),
			"testuser1",
		);

		await user.click(
			screen.getByRole("button", { name: /compare anime lists/i }),
		);

		await waitFor(
			() => {
				expect(screen.getByText(/no common anime found/i)).toBeInTheDocument();
			},
			{ timeout: 5000 },
		);
	});

	it("should handle malformed API responses", async () => {
		const user = userEvent.setup();

		render(<ComparisonPage />);

		await user.type(
			screen.getByLabelText(/first anilist user id/i),
			"malformedresponse",
		);
		await user.type(
			screen.getByLabelText(/second anilist user id/i),
			"testuser1",
		);

		await user.click(
			screen.getByRole("button", { name: /compare anime lists/i }),
		);

		// Should handle malformed response gracefully (empty list)
		await waitFor(
			() => {
				expect(screen.getByText(/no common anime found/i)).toBeInTheDocument();
			},
			{ timeout: 5000 },
		);
	});

	it("should validate user input", async () => {
		const user = userEvent.setup();

		render(<ComparisonPage />);

		// Try to submit with invalid user IDs
		await user.type(
			screen.getByLabelText(/first anilist user id/i),
			"invalid user!",
		);
		await user.type(
			screen.getByLabelText(/second anilist user id/i),
			"user with spaces",
		);

		await user.click(
			screen.getByRole("button", { name: /compare anime lists/i }),
		);

		// Should show validation errors
		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText(/invalid user ids/i)).toBeInTheDocument();
	});

	it("should prevent duplicate user IDs", async () => {
		const user = userEvent.setup();

		render(<ComparisonPage />);

		// Enter same user ID twice
		await user.type(
			screen.getByLabelText(/first anilist user id/i),
			"testuser1",
		);
		await user.type(
			screen.getByLabelText(/second anilist user id/i),
			"testuser1",
		);

		await user.click(
			screen.getByRole("button", { name: /compare anime lists/i }),
		);

		// Should show validation error
		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText(/user ids must be different/i)).toBeInTheDocument();
	});

	it("should clear results when clear button is clicked", async () => {
		const user = userEvent.setup();

		render(<ComparisonPage />);

		// Complete a successful comparison first
		await user.type(
			screen.getByLabelText(/first anilist user id/i),
			"testuser1",
		);
		await user.type(
			screen.getByLabelText(/second anilist user id/i),
			"testuser2",
		);
		await user.click(
			screen.getByRole("button", { name: /compare anime lists/i }),
		);

		await waitFor(() => {
			expect(screen.getByText(/comparison summary/i)).toBeInTheDocument();
		});

		// Click clear button
		await user.click(screen.getByRole("button", { name: /clear results/i }));

		// Results should be cleared
		expect(screen.queryByText(/comparison summary/i)).not.toBeInTheDocument();
		expect(
			screen.queryByRole("button", { name: /clear results/i }),
		).not.toBeInTheDocument();

		// Form should be reset and ready for new input
		// Note: Form clearing might be async, so we should wait for it
		await waitFor(() => {
			expect(screen.getByLabelText(/first anilist user id/i)).toHaveValue("");
			expect(screen.getByLabelText(/second anilist user id/i)).toHaveValue("");
		});
	});
});
