import { style } from "@vanilla-extract/css";

export const formContainer = style({
	maxWidth: "600px",
	margin: "0 auto",
	padding: "1.5rem",
	backgroundColor: "#ffffff",
	borderRadius: "12px",
	boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
	border: "1px solid #e9ecef",

	"@media": {
		"screen and (min-width: 768px)": {
			padding: "2rem",
		},
		"screen and (min-width: 1024px)": {
			maxWidth: "800px",
		},
	},
});

export const fieldGroup = style({
	marginBottom: "1.5rem",
});

export const fieldsContainer = style({
	display: "flex",
	flexDirection: "column",
	gap: "1.5rem",

	"@media": {
		"screen and (min-width: 768px)": {
			flexDirection: "row",
			gap: "2rem",
		},
	},
});

export const fieldWrapper = style({
	flex: 1,
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
	padding: "0.875rem 2rem",
	backgroundColor: "#007bff",
	color: "white",
	border: "none",
	borderRadius: "8px",
	fontSize: "1.1rem",
	fontWeight: "600",
	cursor: "pointer",
	transition: "all 0.2s ease",
	marginTop: "1rem",

	":hover": {
		backgroundColor: "#0056b3",
		transform: "translateY(-1px)",
		boxShadow: "0 4px 8px rgba(0, 123, 255, 0.3)",
	},

	":disabled": {
		backgroundColor: "#6c757d",
		cursor: "not-allowed",
		transform: "none",
		boxShadow: "none",
	},

	"@media": {
		"screen and (min-width: 1024px)": {
			width: "auto",
			minWidth: "200px",
			alignSelf: "center",
		},
	},
});
