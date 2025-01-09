import { NextFunction, Request, Response } from "express";

export class ErrorHandler extends Error {
  constructor(public message: string, public statusCode?: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if (err.name === "CastError") err.message = "Invalid ID";
  res.status(err.statusCode).json({ success: false, message: err.message });
};