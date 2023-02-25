import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.Error";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const ensureTokenValid = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      id: Number(decoded.sub),
      admin: decoded.admin,
    };
    return next();
  });
};
