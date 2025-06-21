import {
	alertBase,
	alertVariants,
	cardBase,
	cardContent,
	cardTitle,
	cx,
	responsiveGrid,
	spinner,
	textVariants,
} from "@1gy/anima-styles";
import { sortCommonAnimeByScore } from "../services";
import type { ComparisonResultProps } from "../types";
import { AnimeCard } from "./AnimeCard";
import * as styles from "./ComparisonResult.styles.css";

export const ComparisonResult = ({
	result,
	isLoading,
	error,
}: ComparisonResultProps) => {
	if (isLoading) {
		return (
			<output className={styles.loadingContainer}>
				<div className={spinner} />
				<div>Loading comparison results...</div>
			</output>
		);
	}

	if (error) {
		return (
			<div role="alert" className={cx(alertBase, alertVariants.error)}>
				<h3 className={cardTitle}>Error</h3>
				<p>{error.message}</p>
			</div>
		);
	}

	if (!result) {
		return null;
	}

	const { user1, user2, commonAnime, user1Stats, user2Stats, similarityScore } =
		result;
	const sortedCommonAnime = sortCommonAnimeByScore(commonAnime);

	return (
		<div className={styles.pageContainer}>
			<div className={cx(cardBase, styles.resultContainer)}>
				<div className={cardContent}>
					<h3 className={cardTitle}>Comparison Summary</h3>
					<div className={styles.summaryStats}>
						<div className={styles.statLine}>
							<span className={styles.statLabel}>{user1}:</span>
							<span className={styles.statValue}>
								{user1Stats.totalAnime} anime ({user1Stats.completedAnime}{" "}
								completed, avg score: {user1Stats.averageScore})
							</span>
						</div>
						<div className={styles.statLine}>
							<span className={styles.statLabel}>{user2}:</span>
							<span className={styles.statValue}>
								{user2Stats.totalAnime} anime ({user2Stats.completedAnime}{" "}
								completed, avg score: {user2Stats.averageScore})
							</span>
						</div>
						<div className={styles.statLine}>
							<span className={styles.statLabel}>Common anime:</span>
							<span className={styles.statValue}>{commonAnime.length}</span>
						</div>
						<div className={styles.statLine}>
							<span className={styles.statLabel}>Similarity score:</span>
							<span className={styles.statValue}>{similarityScore}%</span>
						</div>
					</div>
				</div>
			</div>

			{commonAnime.length > 0 ? (
				<div>
					<h3 className={styles.sectionTitle}>
						Common Anime ({commonAnime.length})
					</h3>
					<div className={responsiveGrid}>
						{sortedCommonAnime.map((commonAnime) => (
							<AnimeCard key={commonAnime.anime.id} commonAnime={commonAnime} />
						))}
					</div>
				</div>
			) : (
				<div className={styles.noResultsContainer}>
					<h3 className={textVariants.h3}>No Common Anime Found</h3>
					<p className={textVariants.body}>
						These users don't have any anime in common.
					</p>
				</div>
			)}
		</div>
	);
};
