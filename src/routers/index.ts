import { Router } from "express";
import { loginRouter } from "./login.routes";
import { userRouter } from "./user.routes";

export const router = Router();

router.use("/users", userRouter);
router.use("/login", loginRouter);
