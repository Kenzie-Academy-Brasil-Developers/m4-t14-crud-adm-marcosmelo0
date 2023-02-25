import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database/config";
import { AppError } from "../errors/app.Error";

export const ensureUserExists = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const queryString: string = `
      SELECT
          *
      FROM
          users
      WHERE
          id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult = await client.query(queryConfig);

  if (!queryResult.rowCount) {
    throw new AppError("User not found!", 404);
  }

  return next();
};
