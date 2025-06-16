import { getAnimeCoverImage, getAnimeDisplayTitle } from "../../../shared/api";
import type { CommonAnime } from "../../../shared/types";
import * as styles from "./AnimeCard.css";

export type AnimeCardProps = {
	readonly commonAnime: CommonAnime;
};

export const AnimeCard = ({ commonAnime }: AnimeCardProps) => {
	const { anime, user1Entry, user2Entry } = commonAnime;
	const title = getAnimeDisplayTitle(anime);
	const imageUrl = getAnimeCoverImage(anime);

	const formatScore = (score?: number): string => {
		if (!score || score === 0) return "Not scored";
		return score.toString();
	};

	const formatStatus = (status: string): string => {
		return status.charAt(0) + status.slice(1).toLowerCase();
	};

	return (
		<div className={styles.cardContainer}>
			<div className={styles.cardHeader}>
				<div className={styles.imageContainer}>
					<img
						src={imageUrl}
						alt={`${title} cover`}
						width={85}
						height={120}
						loading="lazy"
						className={styles.animeImage}
					/>
				</div>

				<div className={styles.cardContent}>
					<h3 className={styles.animeTitle}>{title}</h3>

					{anime.averageScore && (
						<div className={styles.averageScore}>
							Average Score: {anime.averageScore}
						</div>
					)}
				</div>
			</div>

			<div className={styles.userComparisonContainer}>
				<div className={styles.userSection}>
					<span className={styles.userLabel}>User 1:</span>
					<div className={styles.userStat}>
						Status: {formatStatus(user1Entry.status)}
					</div>
					<div className={styles.userStat}>
						Score: {formatScore(user1Entry.score)}
					</div>
				</div>

				<div className={styles.userSection}>
					<span className={styles.userLabel}>User 2:</span>
					<div className={styles.userStat}>
						Status: {formatStatus(user2Entry.status)}
					</div>
					<div className={styles.userStat}>
						Score: {formatScore(user2Entry.score)}
					</div>
				</div>
			</div>
		</div>
	);
};
