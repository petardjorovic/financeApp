import mongoose from "mongoose";
import TransferTypes from "../constants/transferTypes.js";

interface TransferDocument extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  potId: mongoose.Types.ObjectId;
  type: TransferTypes;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const transferSchema = new mongoose.Schema<TransferDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    potId: { type: mongoose.Schema.Types.ObjectId, ref: "Pot", required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
  }
);

transferSchema.index({ userId: 1, potId: 1 });

const TransferModel = mongoose.model<
  TransferDocument,
  mongoose.Model<TransferDocument>
>("Transfer", transferSchema);

export default TransferModel;
