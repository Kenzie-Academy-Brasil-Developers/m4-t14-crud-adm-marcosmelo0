import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import { ensureDataValid } from "../middlewares/ensureDataValid";
import { createLoginSchema } from "../schemas/login.schemas";

export const loginRouter: Router = Router();

loginRouter.post("", ensureDataValid(createLoginSchema), createLoginController);
