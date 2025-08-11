import { CREATED, OK, UNAUTHORIZED } from "../constants/http.js";
import catchErrors from "../utils/catchErrors.js";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
  resetPassword,
  sendPasswordResetEmail,
  verifyEmail,
} from "../services/auth.service.js";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  sethAuthCookies,
} from "../utils/cookies.js";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationCodeSchema,
} from "./auth.schemas.js";
import appAssert from "../utils/appAssert.js";
import { verifyToken } from "../utils/jwt.js";
import SessionModel from "../models/session.model.js";

export const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call service
  const { user, accessToken, refreshToken } = await createAccount(request);

  // return response
  return sethAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  // validate request
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call service
  const { user, accessToken, refreshToken } = await loginUser(request);

  // return response
  return sethAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "Login successfully",
  });
});

export const refreshHandler = catchErrors(async (req, res) => {
  // grab the refreshToken from cookies
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  // call service
  const { accessToken, newRefreshToken } = await refreshUserAccessToken(
    refreshToken
  );

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }

  // return response
  return res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .status(OK)
    .json({
      message: "Access token refreshed",
    });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken as string | undefined;

  const { payload } = verifyToken(accessToken || "");

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  return clearAuthCookies(res).status(OK).json({
    message: "Logout successfull",
  });
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  // validate request
  const verificationCode = verificationCodeSchema.parse(req.params.code);

  // call service
  await verifyEmail(verificationCode);

  // return response
  return res.status(OK).json({
    message: "Email was successfully verified",
  });
});

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  // validate request
  const email = emailSchema.parse(req.body.email);

  // call service
  const { emailId, url } = await sendPasswordResetEmail(email);

  // return response
  res.status(OK).json({
    message: "Password reset email sent",
  });
});

export const resetPasswordHandler = catchErrors(async (req, res) => {
  // validate request
  const request = resetPasswordSchema.parse(req.body);

  // call service
  await resetPassword(request);

  // return response
  return clearAuthCookies(res).status(OK).json({
    message: "Password reset successfully",
  });
});
