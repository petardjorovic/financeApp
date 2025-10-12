import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import appAssert from "../utils/appAssert.js";
import { NOT_FOUND } from "../constants/http.js";
import SessionModel from "../models/session.model.js";

type EditPasswordProps = {
  userId: mongoose.Types.ObjectId;
  password: string;
};

export const editPassword = async ({ userId, password }: EditPasswordProps) => {
  // edit password if user exists

  const existedUser = await UserModel.findById(userId);
  appAssert(existedUser, NOT_FOUND, "User not found");
  existedUser.password = password;
  await existedUser.save();

  // delete all users's sessions
  await SessionModel.deleteMany({ userId });
};
