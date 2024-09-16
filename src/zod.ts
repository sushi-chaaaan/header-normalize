import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";

const UpperHeaderSchema = z.object({
  "X-API-Key": z.string(),
});

const LowerHeaderSchema = z.object({
  "x-api-key": z.string(),
});

const zodRoute = new Hono()
  .get(
    "/upper",
    zValidator("header", UpperHeaderSchema, (r, c) => {
      console.log("Actual header:");
      console.log(c.req.raw.headers);

      if (r.success) {
        console.log("Header is valid");
      } else {
        console.dir(r.error, { depth: null });
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
    zValidator("header", LowerHeaderSchema, (r, c) => {
      console.log("Actual header:");
      console.log(c.req.raw.headers);
      if (r.success) {
        console.log("Header is valid");
      } else {
        console.dir(r.error, { depth: null });
        throw new HTTPException(400, { message: "Invalid header" });
      }
    }),
    (c) => {
      const h = c.req.valid("header");
      console.log(h);
      return c.text("Hello World");
    }
  );

export default zodRoute;
