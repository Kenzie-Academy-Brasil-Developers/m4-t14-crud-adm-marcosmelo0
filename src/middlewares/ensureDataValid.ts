import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const ensureDataValid =
  (shema: ZodTypeAny) => (req: Request, resp: Response, next: NextFunction) => {
    const validatedData = shema.parse(req.body);

    req.body = validatedData;

    return next();
  };
