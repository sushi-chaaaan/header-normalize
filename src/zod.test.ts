import { testClient } from "hono/testing";
import { describe, it, expect } from "vitest";
import app from "./zod";

describe("Zod Route", () => {
  const client = testClient(app);

  it("GET /upper with client", async () => {
    const res = await client.upper.$get({ header: { "X-API-Key": "123" } });

    expect(res.status).toBe(200);
  });

  it("GET /upper with app.request", async () => {
    const res = await app.request("/upper", {
      headers: {
        "X-API-Key": "123",
      },
    });
    expect(res.status).toBe(200);
  });

  it("GET /lower with client", async () => {
    const res = await client.lower.$get({ header: { "x-api-key": "123" } });

    expect(res.status).toBe(200);
  });

  it("GET /lower with app.request", async () => {
    const res = await app.request("/lower", {
      headers: {
        "x-api-key": "123",
      },
    });
    expect(res.status).toBe(200);
  });
});
