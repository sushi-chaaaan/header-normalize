import { testClient } from "hono/testing";
import { describe, it, expect } from "vitest";
import app from ".";

describe("Zod Route", () => {
  const client = testClient(app);

  it("GET /upper with client", async () => {
    const res = await client.zod.upper.$get({ header: { "X-API-Key": "123" } });

    expect(res.status).toBe(200);
  });

  it("GET /upper with app.request", async () => {
    const res = await app.request("/zod/upper", {
      headers: {
        "X-API-Key": "123",
      },
    });
    expect(res.status).toBe(200);
  });

  it("GET /lower with client", async () => {
    const res = await client.zod.lower.$get({ header: { "x-api-key": "123" } });

    expect(res.status).toBe(200);
  });

  it("GET /lower with app.request", async () => {
    const res = await app.request("/zod/lower", {
      headers: {
        "x-api-key": "123",
      },
    });
    expect(res.status).toBe(200);
  });
});

describe("Valibot Route", () => {
  const client = testClient(app);

  it("GET /upper with client", async () => {
    const res = await client.valibot.upper.$get({
      header: { "X-API-Key": "123" },
    });

    expect(res.status).toBe(200);
  });

  it("GET /upper with app.request", async () => {
    const res = await app.request("/valibot/upper", {
      headers: {
        "X-API-Key": "123",
      },
    });
    expect(res.status).toBe(200);
  });

  it("GET /lower with client", async () => {
    const res = await client.valibot.lower.$get({
      header: { "x-api-key": "123" },
    });

    expect(res.status).toBe(200);
  });

  it("GET /lower with app.request", async () => {
    const res = await app.request("/valibot/lower", {
      headers: {
        "x-api-key": "123",
      },
    });
    expect(res.status).toBe(200);
  });
});
