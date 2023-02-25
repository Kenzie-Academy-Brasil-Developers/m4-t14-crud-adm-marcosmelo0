import { Router } from "express";
import {
  createUserController,
  listUserController,
  listUserProfileController,
  recoverUserController,
  softDeleteUserController,
  updateUserController,
} from "../controllers/users.controllers";
import { userSchema, userUpdateSchema } from "../schemas/user.schemas";
import { ensureDataValid } from "../middlewares/ensureDataValid";
import { ensureTokenValid } from "../middlewares/ensureTokenValid";
import { ensureUserExists } from "../middlewares/ensureUserExists";
import { ensureEmailValid } from "../middlewares/ensureEmailValid";

export const userRouter = Router();

userRouter.post(
  "",
  ensureDataValid(userSchema),
  ensureEmailValid,
  createUserController
);

userRouter.get("", ensureTokenValid, listUserController);
userRouter.get("/profile", ensureTokenValid, listUserProfileController);

userRouter.patch(
  "/:id",
  ensureTokenValid,
  ensureUserExists,
  ensureDataValid(userUpdateSchema),
  ensureEmailValid,
  updateUserController
);
userRouter.put(
  "/:id/recover",
  ensureTokenValid,
  ensureUserExists,
  recoverUserController
);

userRouter.delete(
  "/:id",
  ensureTokenValid,
  ensureUserExists,
  softDeleteUserController
);
