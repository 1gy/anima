import { useAtom, useSetAtom } from "jotai";
import {
	clearComparison$,
	comparisonState$,
	performComparison$,
} from "../store";
import * as styles from "./ComparisonPage.css";
import { ComparisonResult } from "./ComparisonResult";
import { UserInputForm } from "./UserInputForm";

export const ComparisonPage = () => {
	const [state] = useAtom(comparisonState$);
	const performComparison = useSetAtom(performComparison$);
	const clearComparison = useSetAtom(clearComparison$);

	const handleCompare = (userIds: readonly string[]) => {
		performComparison(userIds);
	};

	const handleClear = () => {
		clearComparison();
	};

	const hasResults = state.result || state.error;
	const shouldClearForm = !state.isLoading && !hasResults;

	return (
		<div className={styles.pageContainer}>
			<h1 className={styles.pageTitle}>Anime Comparison</h1>

			<UserInputForm
				onSubmit={handleCompare}
				isLoading={state.isLoading}
				error={state.error?.message}
				clearTrigger={shouldClearForm}
			/>

			{hasResults && (
				<>
					<ComparisonResult
						result={state.result}
						isLoading={state.isLoading}
						error={state.error}
					/>

					<button
						type="button"
						onClick={handleClear}
						className={styles.clearButton}
					>
						Clear Results
					</button>
				</>
			)}
		</div>
	);
};
