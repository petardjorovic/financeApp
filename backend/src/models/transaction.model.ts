import mongoose from "mongoose";
import TransactionTypes from "../constants/TransactionTypes.js";

interface TransactionDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: TransactionTypes;
  amount: number;
  account?: string;
  categoryId?: mongoose.Types.ObjectId;
  potId?: mongoose.Types.ObjectId;
  date: Date;
  recurringBillId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new mongoose.Schema<TransactionDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    account: { type: String, trim: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    potId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pot",
    },
    date: { type: Date, required: true },
    recurringBillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecurringBill",
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.index({ userId: 1, categoryId: 1 });
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ account: "text" });
transactionSchema.index({ recurringBillId: 1 });

const TransactionModel = mongoose.model<
  TransactionDocument,
  mongoose.Model<TransactionDocument>
>("Transaction", transactionSchema);

export default TransactionModel;
