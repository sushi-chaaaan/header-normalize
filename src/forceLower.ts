import { AnyZodObject, ZodObject, z } from "zod";

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type LowercasedKeys<T> = keyof T extends string
  ? {
      [K in keyof T as Lowercase<K>]: T[K];
    }
  : never;

type NeverIfUpperCaseKey<T> = keyof T extends string
  ? Equal<keyof LowercasedKeys<T>, keyof T> extends true
    ? T
    : never
  : T;

type ExtractKeyFromZodObject<SCHEMA extends AnyZodObject> =
  SCHEMA extends ZodObject<infer S>
    ? ReturnType<SCHEMA["keyof"]>["Values"]
    : never;

type ForcedLowerCaseKeyZod<SCHEMA extends AnyZodObject> =
  ExtractKeyFromZodObject<SCHEMA> extends never
    ? never
    : NeverIfUpperCaseKey<ExtractKeyFromZodObject<SCHEMA>> extends never
    ? never
    : SCHEMA;

const lower = z.object({
  name: z.string(),
  email: z.string(),
});

const upper = z.object({
  Name: z.string(),
  Email: z.string(),
});

const errorIfUpperCaseKeyZod = <SCHEMA extends AnyZodObject>(
  s: ForcedLowerCaseKeyZod<SCHEMA>
) => {};

errorIfUpperCaseKeyZod(lower); // OK
errorIfUpperCaseKeyZod(upper); // Error
