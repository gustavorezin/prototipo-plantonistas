import { ITokenProvider } from "@commons/domain/providers/ITokenProvider";
import { AppError } from "@commons/error/AppError";
import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";

export function isAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const token = request.cookies?.token;

  if (!token) {
    throw new AppError("Não contém Token JWT", 401);
  }

  const tokenProvider = container.resolve<ITokenProvider>("TokenProvider");
  const { sub } = tokenProvider.verifyToken(token);

  request.user = {
    id: sub,
  };

  return next();
}
