import UserModel from "../models/user.model.js";
import catchErrors from "../utils/catchErrors.js";
import appAssert from "../utils/appAssert.js";
import { BAD_REQUEST, NOT_FOUND, OK } from "../constants/http.js";
import { editPassword, editProfile } from "../services/user.service.js";
import { clearAuthCookies } from "../utils/cookies.js";
import {
  editPasswordSchema,
  editProfileSchema,
} from "../schemas/user.schemas.js";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../constants/env.js";

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");

  return res.status(OK).json(user.omitPassword());
});

export const editProfileHandler = catchErrors(async (req, res) => {
  // validate request
  appAssert(
    req.file || req.body.fullName,
    BAD_REQUEST,
    "No data provided for update"
  );
  const request = editProfileSchema.parse(req.body);

  // call service
  await editProfile({
    userId: req.userId,
    fullName: request.fullName,
    file: req.file,
  });

  // return response
  res.status(OK).json({ message: "Profile successfully updated" });
});

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
