import { createLoginSchema } from "../schemas/login.schemas";
import { z } from "zod";

export type TLoginRequest = z.infer<typeof createLoginSchema>;
