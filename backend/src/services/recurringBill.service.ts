import mongoose from "mongoose";
import CategoryModel from "../models/category.model.js";
import appAssert from "../utils/appAssert.js";
import { BAD_REQUEST, NOT_FOUND } from "../constants/http.js";
import RecurringBillModel from "../models/recurringBill.js";

type AddRecurringBillParams = {
  userId: mongoose.Types.ObjectId;
  name: string;
  dueDate: number;
  categoryId: string;
};

export const addRecurringBill = async ({
  name,
  dueDate,
  categoryId,
  userId,
}: AddRecurringBillParams) => {
  const category = await CategoryModel.findById(categoryId);
  appAssert(category, NOT_FOUND, "Category not found");
  appAssert(
    category.type === "expense",
    BAD_REQUEST,
    "Category must be the type of expense"
  );

  const saved = await RecurringBillModel.create({
    userId,
    name,
    dueDate,
    categoryId,
  });

  return {
    recurringBill: { ...(await saved).toObject() },
  };
};
