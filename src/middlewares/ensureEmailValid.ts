import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/config";
import { AppError } from "../errors/app.Error";

export const ensureEmailValid = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const queryStringUserExist: string = `
      SELECT
          *
      FROM
          users
      WHERE
          email = $1;
  `;

  const queryConfigExists: QueryConfig = {
    text: queryStringUserExist,
    values: [req.body.email],
  };

  const queryResultUserExists: QueryResult = await client.query(
    queryConfigExists
  );

  if (queryResultUserExists.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};
