import { Request, Response } from "express";
import { AppError } from "../errors/app.Error";
import { createUserService } from "../services/users/createUser.service";
import {
  listUserProfile,
  listUsersService,
} from "../services/users/listUsers.service";
import { updateUserService } from "../services/users/updateUsers.service";
import { softDeleteUser } from "../services/users/softDeleteUser.service";
import { recoverUser } from "../services/users/recoverUser.service";

export const createUserController = async (req: Request, resp: Response) => {
  const data = await createUserService(req.body);

  return resp.status(201).json(data);
};

export const listUserController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  if (!req.user.admin) {
    throw new AppError("Insufficient Permission", 403);
  }
  const users = await listUsersService();

  return resp.json(users);
};

export const listUserProfileController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const userId: number = req.user.id;

  const getUserProfile = await listUserProfile(userId);
  return resp.json(getUserProfile);
};

export const updateUserController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);

  if (!req.user.admin && req.user.id !== userId) {
    throw new AppError("Insufficient Permission", 403);
  }

  const updateUser = await updateUserService(req.body, userId);

  return resp.json(updateUser);
};

export const softDeleteUserController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);

  if (!req.user.admin && req.user.id !== userId) {
    throw new AppError("Insufficient Permission", 403);
  }

  const deleteUser = await softDeleteUser(userId);

  return resp.status(204).send();
};

export const recoverUserController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);

  if (!req.user.admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  const recoveredUser = await recoverUser(userId);

  return resp.json(recoveredUser);
};
