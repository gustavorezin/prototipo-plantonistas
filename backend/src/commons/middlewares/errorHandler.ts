import { AppError } from "@commons/error/AppError";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
    return;
  }

  console.error(error);

  response.status(500).json({
    status: 500,
    message: "Internal server error",
  });
};
