import { hashSync } from "bcryptjs";
import { z } from "zod";

export const userSchema = z.object({
  password: z
    .string()
    .min(6)
    .max(120)
    .transform((pass) => hashSync(pass, 10)),
  name: z.string().min(3).max(50),
  email: z.string().email(),
  admin: z.boolean().optional(),
});

export const userCreatedSchema = userSchema.extend({
  id: z.number(),
  active: z.boolean(),
});

export const userUpdateSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(6)
    .max(120)
    .transform((pass) => hashSync(pass, 10))
    .optional(),
});

export const userUpdatedSchema = userUpdateSchema.extend({
  id: z.number(),
  active: z.boolean(),
  admin: z.boolean(),
});

export const userWithoutPasswordSchema = userCreatedSchema.omit({
  password: true,
});
export const userUpdatedWithoutPasswordSchema = userUpdatedSchema.omit({
  password: true,
});
export const allUsersSchema = z.array(userWithoutPasswordSchema);
