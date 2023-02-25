import {
  TAllUsersReturn,
  TUserQueryResponse,
  TUserResponse,
} from "../../interfaces/users.interfaces";
import { client } from "../../database/config";
import {
  allUsersSchema,
  userWithoutPasswordSchema,
} from "../../schemas/user.schemas";
import { QueryConfig } from "pg";

export const listUsersService = async (): Promise<TAllUsersReturn> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users;
    `;

  const queryResult: TUserQueryResponse = await client.query(queryString);
  const users: TAllUsersReturn = allUsersSchema.parse(queryResult.rows);

  return users;
};

export const listUserProfile = async (
  userId: number
): Promise<TUserResponse> => {
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
    values: [userId],
  };

  const queryResult: TUserQueryResponse = await client.query(queryConfig);
  const user: TUserResponse = userWithoutPasswordSchema.parse(
    queryResult.rows[0]
  );

  return user;
};
