import { Request, Response } from "express";
import { createLoginService } from "../services/login/createLogin.service";

export const createLoginController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const token = await createLoginService(req.body);
  return resp.json({
    token: token,
  });
};
