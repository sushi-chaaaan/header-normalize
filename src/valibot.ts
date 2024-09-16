import { Hono } from "hono";
import * as v from "valibot";
import { vValidator } from "@hono/valibot-validator";
import { HTTPException } from "hono/http-exception";

const UpperHeaderSchema = v.object({
  "X-API-Key": v.string(),
});

const LowerHeaderSchema = v.object({
  "x-api-key": v.string(),
});

const valibotRoute = new Hono()
  .get(
    "/upper",
    vValidator("header", UpperHeaderSchema, (r, c) => {
      console.log("Actual header:");
      console.log(c.req.raw.headers);

      if (r.success) {
        console.log("Header is valid");
      } else {
        console.dir(r.issues, { depth: null });
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
    vValidator("header", LowerHeaderSchema, (r, c) => {
      console.log("Actual header:");
      console.log(c.req.raw.headers);

      if (r.success) {
        console.log("Header is valid");
      } else {
        console.dir(r.issues, { depth: null });
        throw new HTTPException(400, { message: "Invalid header" });
      }
    }),
    (c) => {
      const h = c.req.valid("header");
      console.log(h);
      return c.text("Hello World");
    }
  );

export default valibotRoute;
