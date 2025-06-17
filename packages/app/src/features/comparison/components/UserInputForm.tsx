import { type FormEvent, useState } from "react";
import {
	alertBase,
	alertVariants,
	buttonBase,
	buttonSizes,
	buttonVariants,
	cardBase,
	cardContent,
	composeStyles,
	formGroup,
	inputBase,
	inputStates,
	label,
	tokens,
} from "../../../shared/design-system";
import { isValidUserId } from "../services";
import type { UserInputFormProps } from "../types";
import * as styles from "./UserInputForm.styles.css";

export const UserInputForm = ({
	onSubmit,
	isLoading = false,
	error,
}: UserInputFormProps) => {
	const [user1Id, setUser1Id] = useState("");
	const [user2Id, setUser2Id] = useState("");
	const [validationErrors, setValidationErrors] = useState<string[]>([]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const errors: string[] = [];

		if (!isValidUserId(user1Id)) {
			errors.push("First user ID is invalid");
		}

		if (!isValidUserId(user2Id)) {
			errors.push("Second user ID is invalid");
		}

		if (user1Id.trim().toLowerCase() === user2Id.trim().toLowerCase()) {
			errors.push("User IDs must be different");
		}

		setValidationErrors(errors);

		if (errors.length === 0) {
			onSubmit([user1Id.trim(), user2Id.trim()]);
		}
	};

	const handleUser1Change = (value: string) => {
		setUser1Id(value);
		if (validationErrors.length > 0) {
			setValidationErrors([]);
		}
	};

	const handleUser2Change = (value: string) => {
		setUser2Id(value);
		if (validationErrors.length > 0) {
			setValidationErrors([]);
		}
	};

	const hasErrors = validationErrors.length > 0 || error;
	const canSubmit = user1Id.trim() && user2Id.trim() && !isLoading;

	return (
		<div className={`${cardBase} ${styles.formContainer}`}>
			<div className={cardContent}>
				<form onSubmit={handleSubmit}>
					<div className={styles.fieldsContainer}>
						<div className={styles.fieldWrapper}>
							<div className={formGroup}>
								<label htmlFor="user1Id" className={label}>
									First AniList User ID
								</label>
								<input
									id="user1Id"
									type="text"
									value={user1Id}
									onChange={(e) => handleUser1Change(e.target.value)}
									placeholder="Enter first user ID"
									disabled={isLoading}
									required
									className={composeStyles(
										inputBase,
										hasErrors ? inputStates.error : inputStates.default,
									)}
								/>
							</div>
						</div>

						<div className={styles.fieldWrapper}>
							<div className={formGroup}>
								<label htmlFor="user2Id" className={label}>
									Second AniList User ID
								</label>
								<input
									id="user2Id"
									type="text"
									value={user2Id}
									onChange={(e) => handleUser2Change(e.target.value)}
									placeholder="Enter second user ID"
									disabled={isLoading}
									required
									className={composeStyles(
										inputBase,
										hasErrors ? inputStates.error : inputStates.default,
									)}
								/>
							</div>
						</div>
					</div>

					{hasErrors && (
						<div
							role="alert"
							className={composeStyles(alertBase, alertVariants.error)}
						>
							{validationErrors.map((error) => (
								<div key={error}>{error}</div>
							))}
							{error && <div>{error}</div>}
						</div>
					)}

					<button
						type="submit"
						disabled={!canSubmit}
						className={composeStyles(
							buttonBase,
							buttonVariants.primary,
							buttonSizes.lg,
						)}
					>
						{isLoading ? "Comparing..." : "Compare Anime Lists"}
					</button>
				</form>
			</div>
		</div>
	);
};
