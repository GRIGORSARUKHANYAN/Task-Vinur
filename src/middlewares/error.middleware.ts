import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpException) {
    res.status(error.status).json({ error: { message: error.message } });
  } else {
    // Handle other errors (non-HttpException) without exposing the stack trace
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: { message: "Something went wrong" } });
  }
};
