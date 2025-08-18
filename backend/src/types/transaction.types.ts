import mongoose from "mongoose";

export type TransactionDTO = {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: string;
  amount: number;
  account?: string;
  categoryId?: {
    _id: mongoose.Types.ObjectId;
  };
  date: Date;
  recurringBillId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
