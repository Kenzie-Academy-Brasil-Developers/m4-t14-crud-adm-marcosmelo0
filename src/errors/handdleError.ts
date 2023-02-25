import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "./app.Error";

export const handdleError = (
  error: Error,
  req: Request,
  resp: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return resp.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return resp.status(400).json({
      message: error.flatten().fieldErrors,
    });
  }
  console.log(error);
  return resp.status(500).json({
    message: "Internal server error.",
  });
};
