import { QueryConfig } from "pg";
import { client } from "../../database/config";
import { AppError } from "../../errors/app.Error";
import {
  TUserResponse,
  TUserUpdatedQueryResponse,
} from "../../interfaces/users.interfaces";
import { userWithoutPasswordSchema } from "../../schemas/user.schemas";

export const recoverUser = async (userId: number): Promise<TUserResponse> => {
  const templateString: string = `
      SELECT 
          *
      FROM
          users
      WHERE
          id = $1;
  `;

  const templateConfig: QueryConfig = {
    text: templateString,
    values: [userId],
  };

  const templateResult: TUserUpdatedQueryResponse = await client.query(
    templateConfig
  );

  const recoveredUser: TUserResponse = userWithoutPasswordSchema.parse(
    templateResult.rows[0]
  );

  if (recoveredUser.active) {
    throw new AppError("User already active", 400);
  }

  const queryString: string = `
          UPDATE 
              users
          SET
              "active" = true
          WHERE
              id = $1;
      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: TUserUpdatedQueryResponse = await client.query(
    queryConfig
  );

  return recoveredUser;
};
