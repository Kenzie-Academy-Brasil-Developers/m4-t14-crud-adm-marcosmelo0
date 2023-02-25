import { QueryConfig } from "pg";
import { client } from "../../database/config";
import { TUserUpdatedQueryResponse } from "../../interfaces/users.interfaces";

export const softDeleteUser = async (
  userId: number
): Promise<Response | void> => {
  const queryString: string = `
      UPDATE 
          users
      SET
          "active" = false
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
};
