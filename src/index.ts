import { Hono } from "hono";
import zodRoute from "./zod";
import valibotRoute from "./valibot";

const app = new Hono().route("/zod", zodRoute).route("/valibot", valibotRoute);
export default app;
