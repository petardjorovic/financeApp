import mongoose from "mongoose";
import TranasctionTypes from "../constants/TransactionTypes.js";

interface TransactionDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: TranasctionTypes;
  amount: number;
  account: string;
  categoryId: mongoose.Types.ObjectId;
  date: Date;
  isRecurring: boolean;
  dueDate?: number;
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
    account: { type: String, required: true, trim: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    date: { type: Date, required: true },
    isRecurring: { type: Boolean, default: false },
    dueDate: { type: Number },
  },
  {
    timestamps: true,
  }
);

transactionSchema.index({ userId: 1, categoryId: 1 });
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ account: "text" });

const TransactionModel = mongoose.model<
  TransactionDocument,
  mongoose.Model<TransactionDocument>
>("Transaction", transactionSchema);

export default TransactionModel;
