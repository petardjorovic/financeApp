import mongoose from "mongoose";

interface RecurringBillDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  name: string;
  dueDate: number;
  categoryId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const recurringBillSchema = new mongoose.Schema<RecurringBillDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true, lowercase: true },
    dueDate: { type: Number, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

recurringBillSchema.index({ userId: 1, name: 1 }, { unique: true });

const RecurringBillModel = mongoose.model<
  RecurringBillDocument,
  mongoose.Model<RecurringBillDocument>
>("RecurringBill", recurringBillSchema, "recurring_bills");

export default RecurringBillModel;
