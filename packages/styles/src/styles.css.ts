import { globalStyle } from "@vanilla-extract/css";

const ignoreElements = ["canvas", "iframe", "img", "svg", "svg *", "video"];
globalStyle(`*:not(${ignoreElements.join(", ")})`, {
	all: "unset",
	display: "revert",
});

globalStyle("*, *::before, *::after", {
	boxSizing: "border-box",
});
