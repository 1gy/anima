import { describe, expect, it } from "vitest";
import { isValidUserId, normalizeUserId, validateUserIds } from "./validation";

describe("isValidUserId", () => {
	it("should accept valid user IDs", () => {
		expect(isValidUserId("validuser")).toBe(true);
		expect(isValidUserId("user123")).toBe(true);
		expect(isValidUserId("user_name")).toBe(true);
		expect(isValidUserId("user-name")).toBe(true);
		expect(isValidUserId("User123")).toBe(true);
	});

	it("should reject invalid user IDs", () => {
		expect(isValidUserId("")).toBe(false);
		expect(isValidUserId("   ")).toBe(false);
		expect(isValidUserId("user with spaces")).toBe(false);
		expect(isValidUserId("user@domain")).toBe(false);
		expect(isValidUserId("user!special")).toBe(false);
		expect(isValidUserId("a".repeat(51))).toBe(false); // Too long
	});
});

describe("normalizeUserId", () => {
	it("should trim whitespace", () => {
		expect(normalizeUserId("  username  ")).toBe("username");
		expect(normalizeUserId("username")).toBe("username");
		expect(normalizeUserId(" user123 ")).toBe("user123");
	});
});

describe("validateUserIds", () => {
	it("should validate correct user ID pairs", () => {
		const result = validateUserIds(["user1", "user2"]);
		expect(result.isValid).toBe(true);
		expect(result.errors).toHaveLength(0);
	});

	it("should require at least 2 user IDs", () => {
		const result = validateUserIds(["user1"]);
		expect(result.isValid).toBe(false);
		expect(result.errors).toContain("At least 2 user IDs are required");
	});

	it("should reject duplicate user IDs", () => {
		const result = validateUserIds(["user1", "user1"]);
		expect(result.isValid).toBe(false);
		expect(result.errors).toContain("Duplicate user IDs are not allowed");
	});

	it("should reject invalid user IDs", () => {
		const result = validateUserIds(["invalid user", "user2"]);
		expect(result.isValid).toBe(false);
		expect(
			result.errors.some((error) => error.includes("Invalid user IDs")),
		).toBe(true);
	});

	it("should reject too many user IDs", () => {
		const manyUsers = Array.from({ length: 11 }, (_, i) => `user${i}`);
		const result = validateUserIds(manyUsers);
		expect(result.isValid).toBe(false);
		expect(result.errors).toContain("Maximum 10 user IDs allowed");
	});
});
