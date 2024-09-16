import { Hono } from "hono";
import zodRoute from "./zod";
import valibotRoute from "./valibot";
import honoRoute from "./hono";

const app = new Hono()
  .route("/hono", honoRoute)
  .route("/zod", zodRoute)
  .route("/valibot", valibotRoute);
export default app;
