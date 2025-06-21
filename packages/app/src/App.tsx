import * as styles from "./App.css";
import { ComparisonPage } from "./features/comparison";

export const App = () => {
	return (
		<div className={styles.appContainer}>
			<ComparisonPage />
		</div>
	);
};
