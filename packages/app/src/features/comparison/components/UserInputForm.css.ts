import { style } from "@vanilla-extract/css";

export const formContainer = style({
	maxWidth: "600px",
	margin: "0 auto",
	padding: "2rem",
	backgroundColor: "#f8f9fa",
	borderRadius: "8px",
	boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const fieldGroup = style({
	marginBottom: "1.5rem",
});

export const label = style({
	display: "block",
	marginBottom: "0.5rem",
	fontWeight: "bold",
	color: "#333",
});

export const input = style({
	width: "100%",
	padding: "0.75rem",
	border: "1px solid #ddd",
	borderRadius: "4px",
	fontSize: "1rem",
	transition: "border-color 0.2s",

	":focus": {
		outline: "none",
		borderColor: "#007bff",
		boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.25)",
	},

	":disabled": {
		backgroundColor: "#e9ecef",
		cursor: "not-allowed",
	},
});

export const errorContainer = style({
	backgroundColor: "#f8d7da",
	border: "1px solid #f5c6cb",
	borderRadius: "4px",
	padding: "0.75rem",
	marginBottom: "1rem",
	color: "#721c24",
});

export const submitButton = style({
	width: "100%",
	padding: "0.75rem 1.5rem",
	backgroundColor: "#007bff",
	color: "white",
	border: "none",
	borderRadius: "4px",
	fontSize: "1rem",
	fontWeight: "bold",
	cursor: "pointer",
	transition: "background-color 0.2s",

	":hover": {
		backgroundColor: "#0056b3",
	},

	":disabled": {
		backgroundColor: "#6c757d",
		cursor: "not-allowed",
	},
});
