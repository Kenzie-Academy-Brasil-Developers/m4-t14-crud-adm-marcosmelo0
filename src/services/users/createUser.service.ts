import format from "pg-format";
import { client } from "../../database/config";
import {
  TUserQueryResponse,
  TUserRequest,
  TUserResponse,
} from "../../interfaces/users.interfaces";
import { userWithoutPasswordSchema } from "../../schemas/user.schemas";

export const createUserService = async (
  data: TUserRequest
): Promise<TUserResponse> => {
  const queryString: string = format(
    `
        INSERT INTO
            users(%I)
        VALUES
            (%L)
        RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: TUserQueryResponse = await client.query(queryString);
  const newUser: TUserResponse = userWithoutPasswordSchema.parse(
    queryResult.rows[0]
  );

  return newUser;
};
