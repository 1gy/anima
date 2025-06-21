import { style } from "@vanilla-extract/css";

export const cardContainer = style({
	backgroundColor: "#fff",
	border: "1px solid #e9ecef",
	borderRadius: "8px",
	padding: "1rem",
	boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
	transition: "transform 0.2s, box-shadow 0.2s",

	":hover": {
		transform: "translateY(-2px)",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
	},
});

export const cardHeader = style({
	display: "flex",
	gap: "1rem",
	marginBottom: "1rem",
});

export const imageContainer = style({
	flexShrink: 0,
});

export const animeImage = style({
	borderRadius: "4px",
	objectFit: "cover",
});

export const cardContent = style({
	flex: 1,
});

export const animeTitle = style({
	margin: "0 0 0.5rem 0",
	fontSize: "1.1rem",
	fontWeight: "bold",
	color: "#333",
	lineHeight: "1.3",
});

export const averageScore = style({
	fontSize: "0.9rem",
	color: "#007bff",
	fontWeight: "bold",
	marginBottom: "1rem",
});

export const userComparisonContainer = style({
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	gap: "1rem",
	borderTop: "1px solid #e9ecef",
	paddingTop: "1rem",
});

export const userSection = style({
	padding: "0.5rem",
	backgroundColor: "#f8f9fa",
	borderRadius: "4px",
});

export const userLabel = style({
	display: "block",
	fontSize: "0.85rem",
	fontWeight: "bold",
	color: "#495057",
	marginBottom: "0.25rem",
});

export const userStat = style({
	fontSize: "0.8rem",
	color: "#6c757d",
	margin: "0.125rem 0",
});
