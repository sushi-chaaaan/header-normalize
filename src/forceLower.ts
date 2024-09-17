import { AnyZodObject, z } from "zod";

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type NeverIfUpperCaseKey<T extends string> = Equal<T, Lowercase<T>> extends true
  ? T
  : never;

type ExtractKeyFromZodObject<SCHEMA extends AnyZodObject> = z.output<
  ReturnType<SCHEMA["keyof"]>
>;

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

/**
 * Argument of type 'ZodObject<{ Name: ZodString; Email: ZodString; }, "strip", ZodTypeAny, { Name: string; Email: string; }, { Name: string; Email: string; }>'
 * is not assignable to parameter of type 'never'.
 */
errorIfUpperCaseKeyZod(upper);
