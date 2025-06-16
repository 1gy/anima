import type { ApiError, ComparisonResult } from "../../../shared/types";

export type ComparisonState = {
	readonly userIds: readonly string[];
	readonly isLoading: boolean;
	readonly result?: ComparisonResult | undefined;
	readonly error?: ApiError | undefined;
};

export type UserInputFormProps = {
	readonly onSubmit: (userIds: readonly string[]) => void;
	readonly isLoading?: boolean;
	readonly error?: string | undefined;
	readonly clearTrigger?: boolean;
};

export type ComparisonResultProps = {
	readonly result?: ComparisonResult | undefined;
	readonly isLoading?: boolean;
	readonly error?: ApiError | undefined;
};
