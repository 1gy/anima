import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/server";

// Start server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());
