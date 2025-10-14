import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import appAssert from "../utils/appAssert.js";
import { NOT_FOUND } from "../constants/http.js";
import SessionModel from "../models/session.model.js";
import { v2 as cloudinary } from "cloudinary";

type EditProfileProps = {
  userId: mongoose.Types.ObjectId;
  fullName: string | undefined;
  file: Express.Multer.File | undefined;
};

export const editProfile = async ({
  userId,
  fullName,
  file,
}: EditProfileProps) => {
  const existedUser = await UserModel.findById(userId);
  appAssert(existedUser, NOT_FOUND, "User not found");
  if (file) {
    if (
      existedUser.avatar !==
      "https://res.cloudinary.com/dhfzyyycz/image/upload/v1759766870/user_fylf06.png"
    ) {
      const parts = existedUser.avatar.split("/");
      const imageName = parts.pop()?.split(".")[0];
      const folderName = parts[parts.length - 1];
      await cloudinary.uploader.destroy(`${folderName}/${imageName}`);
    }
    existedUser.avatar = file.path;
  }

  if (fullName) {
    existedUser.fullName = fullName;
  }

  await existedUser.save();
};

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
