import mongoose from "mongoose";
import PotModel from "../models/pot.model.js";
import appAssert from "../utils/appAssert.js";
import { CONFLICT, NOT_FOUND } from "../constants/http.js";
import ThemeModel from "../models/theme.model.js";
import TransferModel from "../models/transfer.model.js";

type AddPotParams = {
  name: string;
  target: number;
  themeId: string;
  userId: mongoose.Types.ObjectId;
};

export const addPot = async ({
  name,
  target,
  themeId,
  userId,
}: AddPotParams) => {
  // check weather name or theme already exists in user's pots
  const existingPot = await PotModel.exists({
    userId,
    $or: [{ name }, { themeId }],
  });
  appAssert(
    !existingPot,
    CONFLICT,
    "Pots with this name or theme already exists"
  );

  // check if theme exists
  const existingTheme = await ThemeModel.exists({ _id: themeId });
  appAssert(existingTheme, NOT_FOUND, "Theme not found");

  const pot = await PotModel.create({
    userId,
    name,
    target,
    themeId: new mongoose.Types.ObjectId(themeId),
  });

  return { pot: { ...pot.toObject() } };
};

type PotDepositParams = {
  userId: mongoose.Types.ObjectId;
  potId: string;
  amount: number;
};

export const depositPot = async ({
  userId,
  potId,
  amount,
}: PotDepositParams) => {
  // check weather potId exists
  const existingPot = await PotModel.findOne({ _id: potId, userId });
  appAssert(existingPot, NOT_FOUND, "Pot not found");

  existingPot.currentAmount += amount;
  const savedPot = await existingPot.save();

  return {
    pot: { ...savedPot.toObject() },
  };
};
