import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database/config";
import {
  TUserUpdatedQueryResponse,
  TUserUpdateRequest,
  TUserUpdateResponse,
} from "../../interfaces/users.interfaces";
import { userUpdatedWithoutPasswordSchema } from "../../schemas/user.schemas";

export const updateUserService = async (
  data: TUserUpdateRequest,
  userId: number
): Promise<TUserUpdateResponse> => {
  const queryString: string = format(
    `
            UPDATE
                users
            SET
                (%I) = ROW(%L)
            WHERE
                id = $1
            RETURNING *;;
        `,
    Object.keys(data),
    Object.values(data)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: TUserUpdatedQueryResponse = await client.query(
    queryConfig
  );
  const userUpdated: TUserUpdateResponse =
    userUpdatedWithoutPasswordSchema.parse(queryResult.rows[0]);

  return userUpdated;
};
