import { style } from "@vanilla-extract/css";

export const resultContainer = style({
	maxWidth: "800px",
	margin: "2rem auto",
	padding: "2rem",
});

export const summaryCard = style({
	backgroundColor: "#fff",
	border: "1px solid #e9ecef",
	borderRadius: "8px",
	padding: "1.5rem",
	marginBottom: "2rem",
	boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const summaryTitle = style({
	margin: "0 0 1rem 0",
	color: "#333",
	fontSize: "1.25rem",
	fontWeight: "bold",
});

export const summaryStats = style({
	display: "grid",
	gap: "0.5rem",
});

export const statLine = style({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: "0.25rem 0",
});

export const statLabel = style({
	fontWeight: "bold",
	color: "#555",
});

export const statValue = style({
	color: "#333",
});

export const animeGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
	gap: "1rem",
	marginTop: "1rem",
});

export const loadingContainer = style({
	textAlign: "center",
	padding: "3rem",
	color: "#6c757d",
	fontSize: "1.1rem",
});

export const errorContainer = style({
	backgroundColor: "#f8d7da",
	border: "1px solid #f5c6cb",
	borderRadius: "8px",
	padding: "1.5rem",
	margin: "2rem auto",
	maxWidth: "600px",
	color: "#721c24",
});

export const errorTitle = style({
	margin: "0 0 0.5rem 0",
	fontSize: "1.1rem",
	fontWeight: "bold",
});

export const noResultsContainer = style({
	textAlign: "center",
	padding: "3rem",
	backgroundColor: "#f8f9fa",
	borderRadius: "8px",
	margin: "2rem auto",
	maxWidth: "600px",
});

export const noResultsTitle = style({
	margin: "0 0 1rem 0",
	color: "#495057",
	fontSize: "1.25rem",
});

export const noResultsText = style({
	color: "#6c757d",
});
