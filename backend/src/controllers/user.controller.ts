import UserModel from "../models/user.model.js";
import catchErrors from "../utils/catchErrors.js";
import appAssert from "../utils/appAssert.js";
import { NOT_FOUND, OK } from "../constants/http.js";
import { editPasswordSchema } from "../schemas/auth.schemas.js";
import { editPassword } from "../services/user.service.js";
import { clearAuthCookies } from "../utils/cookies.js";

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");

  return res.status(OK).json(user.omitPassword());
});

export const editProfileHandler = catchErrors(async (req, res) => {});

export const editPasswordHandler = catchErrors(async (req, res) => {
  // validate request
  const request = editPasswordSchema.parse(req.body);

  // call service
  await editPassword({
    userId: req.userId,
    password: request.password,
  });

  // return response
  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Password updated successfully." });
});
