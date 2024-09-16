import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { validator } from "hono/validator";

const honoRoute = new Hono()
  .get(
    "/upper",
    validator("header", (v, c) => {
      console.log("Actual header:");
      console.log(c.req.raw.headers);
      if (!("X-API-Key" in v)) {
        throw new HTTPException(400, { message: "Invalid header" });
      }
      return { "X-API-Key": v["X-API-Key"] };
    }),
    (c) => {
      const h = c.req.valid("header");
      console.log(h);
      return c.text("Hello World");
    }
  )
  .get(
    "/lower",
    validator("header", (v, c) => {
      console.log("Actual header:");
      console.log(c.req.raw.headers);
      if (!("x-api-key" in v)) {
        throw new HTTPException(400, { message: "Invalid header" });
      }
      return { "x-api-key": v["x-api-key"] };
    }),
    (c) => {
      const h = c.req.valid("header");
      console.log(h);
      return c.text("Hello World");
    }
  );

export default honoRoute;
