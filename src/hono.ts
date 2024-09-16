import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { validator } from "hono/validator";

const honoRoute = new Hono()
  .get(
    "/upper",
    validator("header", (v) => {
      if (!("X-API-Key" in v)) {
        throw new HTTPException(400, { message: "Invalid header" });
      }
    }),
    (c) => {
      const h = c.req.valid("header");
      console.log(h);
      return c.text("Hello World");
    }
  )
  .get(
    "/lower",
    validator("header", (v) => {
      if (!("x-api-key" in v)) {
        throw new HTTPException(400, { message: "Invalid header" });
      }
    }),
    (c) => {
      const h = c.req.valid("header");
      console.log(h);
      return c.text("Hello World");
    }
  );

export default honoRoute;
