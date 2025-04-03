import { authConfig } from "@commons/config/authConfig";
import { AppError } from "@commons/error/AppError";
import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export function isAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token is missing.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as JwtPayload;

    request.user = {
      id: sub!,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT Token.");
  }
}
