import { testClient } from "hono/testing";
import { describe, it, expect } from "vitest";
import app from ".";

describe("Test suite", () => {
  const client = testClient(app);

  it("GET /upper", async () => {
    const res = await client.upper.$get({ header: { "X-API-Key": "123" } });

    expect(res.status).toBe(200);
  });

  it("GET /lower", async () => {
    const res = await client.lower.$get({ header: { "x-api-key": "123" } });

    expect(res.status).toBe(200);
  });
});
