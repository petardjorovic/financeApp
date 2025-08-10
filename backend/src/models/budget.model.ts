import mongoose from "mongoose";

interface BudgetDocument extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  limit: number;
  themeId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const budgetSchema = new mongoose.Schema<BudgetDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    limit: { type: Number, required: true, min: 0 },
    themeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theme",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

budgetSchema.index({ userId: 1, categoryId: 1 });

const BudgetModel = mongoose.model<
  BudgetDocument,
  mongoose.Model<BudgetDocument>
>("Budget", budgetSchema);

export default BudgetModel;
