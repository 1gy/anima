import { assert, it } from "vitest";

import { cx } from "./cx";

it("should join class names", () => {
	const result = cx("class1", "class2", undefined, "class3");
	assert("class1 class2 class3" === result);
});
