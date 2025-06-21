export const isValidUserId = (userId: string): boolean => {
	const trimmed = userId.trim();
	if (trimmed.length === 0) return false;
	if (trimmed.length > 50) return false;

	// Allow alphanumeric characters, underscores, and hyphens
	const validPattern = /^[a-zA-Z0-9_-]+$/;
	return validPattern.test(trimmed);
};

export const normalizeUserId = (userId: string): string => {
	return userId.trim();
};

export const validateUserIds = (
	userIds: readonly string[],
): {
	readonly isValid: boolean;
	readonly errors: readonly string[];
} => {
	const errors: string[] = [];

	if (userIds.length < 2) {
		errors.push("At least 2 user IDs are required");
	}

	if (userIds.length > 10) {
		errors.push("Maximum 10 user IDs allowed");
	}

	const normalizedIds = userIds.map(normalizeUserId);
	const duplicates = normalizedIds.filter(
		(id, index) => normalizedIds.indexOf(id) !== index,
	);

	if (duplicates.length > 0) {
		errors.push("Duplicate user IDs are not allowed");
	}

	const invalidIds = userIds.filter((id) => !isValidUserId(id));
	if (invalidIds.length > 0) {
		errors.push(`Invalid user IDs: ${invalidIds.join(", ")}`);
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};
