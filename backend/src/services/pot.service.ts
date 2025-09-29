import mongoose from "mongoose";
import PotModel from "../models/pot.model.js";
import appAssert from "../utils/appAssert.js";
import { BAD_REQUEST, CONFLICT, NOT_FOUND } from "../constants/http.js";
import ThemeModel from "../models/theme.model.js";
import TransferModel from "../models/transfer.model.js";
import TransactionModel from "../models/transaction.model.js";
import TransactionTypes from "../constants/TransactionTypes.js";
import deletePotTransaction from "../utils/deletePotTransaction.js";

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
  const savedPot = await PotModel.exists({
    userId,
    $or: [{ name }, { themeId }],
  });
  appAssert(!savedPot, CONFLICT, "Pots with this name or theme already exists");

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

type EditPotParams = {
  name?: string | undefined;
  target?: number | undefined;
  themeId?: string | undefined;
  potId: string;
  userId: mongoose.Types.ObjectId;
};

export const editPot = async (request: EditPotParams) => {
  const { themeId, name, potId, userId, target } = request;

  const pot = await PotModel.findOne({ _id: potId, userId });
  appAssert(pot, NOT_FOUND, "Pot not found");

  let isModified = false;

  if (themeId && !pot.themeId.equals(themeId)) {
    const [existingTheme, existingPotWithTheme] = await Promise.all([
      ThemeModel.exists({ _id: themeId }),
      PotModel.findOne({ userId, themeId }),
    ]);
    appAssert(existingTheme, NOT_FOUND, "Theme not found");
    appAssert(
      !existingPotWithTheme,
      CONFLICT,
      "Pot with this theme already exists"
    );
    pot.themeId = new mongoose.Types.ObjectId(themeId);
    isModified = true;
  }

  if (target) {
    appAssert(
      target > pot.currentAmount,
      BAD_REQUEST,
      "Target must be greater than currentAmount"
    );
    if (target !== pot.target) {
      pot.target = target;
      isModified = true;
    }
  }

  if (name && name.trim() !== pot.name) {
    pot.name = name;
    isModified = true;
  }

  appAssert(isModified, BAD_REQUEST, "No changes detected");

  const savedPot = await pot.save();

  return {
    pot: { ...savedPot.toObject() },
  };
};

type DepositPotParams = {
  userId: mongoose.Types.ObjectId;
  potId: string;
  amount: number;
};

export const depositPot = async ({
  userId,
  potId,
  amount,
}: DepositPotParams) => {
  const currentBalance = await TransactionModel.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$userId",
        balance: {
          $sum: {
            $switch: {
              branches: [
                { case: { $eq: ["$type", "income"] }, then: "$amount" },
                { case: { $eq: ["$type", "withdraw"] }, then: "$amount" },
                {
                  case: { $eq: ["$type", "expense"] },
                  then: { $multiply: ["$amount", -1] },
                },
                {
                  case: { $eq: ["$type", "deposit"] },
                  then: { $multiply: ["$amount", -1] },
                },
              ],
              default: 0,
            },
          },
        },
      },
    },
  ]);

  const balance = currentBalance[0]?.balance ?? 0;
  appAssert(
    amount <= balance,
    BAD_REQUEST,
    `Insufficient funds. Your current main balance is ${balance.toFixed(2)}.`
  );

  // icrease amount if pot for current user exist
  const savedPot = await PotModel.findOneAndUpdate(
    { _id: potId, userId },
    {
      $inc: { currentAmount: amount },
    },
    { new: true }
  );
  appAssert(savedPot, NOT_FOUND, "Pot not found");

  const savedTransaction = await TransactionModel.create({
    userId,
    type: TransactionTypes.Deposit,
    amount,
    account: `Pot deposit`,
    date: new Date(),
    potId,
  });

  return {
    pot: { ...savedPot.toObject() },
    transaction: { ...savedTransaction.toObject() },
  };
};

type WithdrawPotParams = {
  userId: mongoose.Types.ObjectId;
  potId: string;
  amount: number;
};

export const withdrawPot = async ({
  userId,
  potId,
  amount,
}: WithdrawPotParams) => {
  const savedPot = await PotModel.findOneAndUpdate(
    { _id: potId, userId, currentAmount: { $gte: amount } },
    { $inc: { currentAmount: -amount } },
    { new: true }
  );

  appAssert(savedPot, NOT_FOUND, "Insufficient funds or pot not found");

  const transaction = await TransactionModel.create({
    userId,
    type: TransactionTypes.Withdraw,
    amount,
    account: "Pot withdraw",
    date: new Date(),
    potId,
  });

  return {
    pot: { ...savedPot.toObject() },
    transaction: { ...transaction.toObject() },
  };
};
