import assert from "node:assert";
import AppErrorCode from "../constants/appErrorCode.js";
import { HttpStatusCode } from "../constants/http.js";
import AppError from "./AppError.js";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;

/**
 * Asserts a condition and throws an AppError if the condition is falsy.
 */

const appAssert: AppAssert = (
  condition,
  HttpStatusCode,
  message,
  appErrorCode
) => assert(condition, new AppError(HttpStatusCode, message, appErrorCode));

export default appAssert;
