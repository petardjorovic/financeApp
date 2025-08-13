import mongoose from "mongoose";

export interface BudgetWithSpent {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  categoryId: {
    _id: mongoose.Types.ObjectId;
    name: string;
  };
  limit: number;
  themeId: {
    _id: mongoose.Types.ObjectId;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  spent: number;
}
