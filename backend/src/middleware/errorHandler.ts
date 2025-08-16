import { ErrorRequestHandler, Response } from "express";
import {
  BAD_REQUEST,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} from "../constants/http.js";
import z from "zod";
import AppError from "../utils/AppError.js";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const duplicateKeyErrorHandler = (res: Response, err: any) => {
  const key = Object.keys(err.keyValue);
  const value = Object.values(err.keyValue);
  const message = `There is already key(s) "${key.join(
    ", "
  )}" with value(s) "${value.join(", ")}". Please use another value(s).`;
  return res.status(CONFLICT).json({ error: message });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`Path: ${req.path}`, error);

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  if (error.code === 11000) {
    return duplicateKeyErrorHandler(res, error);
  }

  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  return res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;
