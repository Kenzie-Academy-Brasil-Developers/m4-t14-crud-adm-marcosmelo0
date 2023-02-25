import { QueryConfig } from "pg";
import { TLoginRequest } from "../../interfaces/login.interfaces";
import { client } from "../../database/config";
import { AppError } from "../../errors/app.Error";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createLoginService = async (
  loginData: TLoginRequest
): Promise<string> => {
  const queryString: string = `
        SELECT
            *   
        FROM
            users
        WHERE
            email = $1 AND active = true;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [loginData.email],
  };

  const queryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const matchPassword: boolean = await compare(
    loginData.password,
    queryResult.rows[0].password
  );

  if (!matchPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: queryResult.rows[0].admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};
