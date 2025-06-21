import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import { Button, pageLayout, pageTitle } from "@1gy/anima-styles";
import {
	clearComparison$,
	comparisonState$,
	performComparison$,
} from "../store";
import * as styles from "./ComparisonPage.styles.css";
import { ComparisonResult } from "./ComparisonResult";
import { UserInputForm } from "./UserInputForm";

export const ComparisonPage = () => {
	const [state] = useAtom(comparisonState$);
	const performComparison = useSetAtom(performComparison$);
	const clearComparison = useSetAtom(clearComparison$);
	const [formKey, setFormKey] = useState(0);

	const handleCompare = (userIds: readonly string[]) => {
		performComparison(userIds);
	};

	const handleClear = () => {
		clearComparison();
		setFormKey((prev) => prev + 1); // Force form reset by remounting
	};

	const hasResults = state.result || state.error;

	return (
		<div className={pageLayout}>
			<h1 className={pageTitle}>Anime Comparison</h1>

			<UserInputForm
				key={formKey}
				onSubmit={handleCompare}
				isLoading={state.isLoading}
				error={state.error?.message}
			/>

			{hasResults && (
				<>
					<ComparisonResult
						result={state.result}
						isLoading={state.isLoading}
						error={state.error}
					/>

					<div className={styles.clearButtonContainer}>
						<Button
							type="button"
							onClick={handleClear}
							variant="secondary"
							size="md"
						>
							Clear Results
						</Button>
					</div>
				</>
			)}
		</div>
	);
};
