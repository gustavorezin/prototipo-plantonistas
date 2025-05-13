import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "@commons/error/AppError";

export const validateData = <T>(schema: ZodSchema<T>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const schemaParsed = schema.parse(req.body);
      req.body = schemaParsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        throw new AppError(err.errors[0].message, 400);
      }
      throw err;
    }
  };
};
