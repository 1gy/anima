import { style } from "@vanilla-extract/css";

export const pageContainer = style({
	minHeight: "100vh",
	backgroundColor: "#f8f9fa",
	padding: "2rem 1rem",
});

export const pageTitle = style({
	textAlign: "center",
	margin: "0 0 3rem 0",
	fontSize: "2.5rem",
	fontWeight: "bold",
	color: "#333",
});

export const clearButton = style({
	display: "block",
	margin: "2rem auto",
	padding: "0.75rem 1.5rem",
	backgroundColor: "#6c757d",
	color: "white",
	border: "none",
	borderRadius: "4px",
	fontSize: "1rem",
	cursor: "pointer",
	transition: "background-color 0.2s",

	":hover": {
		backgroundColor: "#545b62",
	},
});
