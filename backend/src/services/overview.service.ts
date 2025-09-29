import mongoose from "mongoose";
import TransactionModel from "../models/transaction.model.js";
import appAssert from "../utils/appAssert.js";

export const getCurrentBalance = async (userId: mongoose.Types.ObjectId) => {
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

  return balance;
};
