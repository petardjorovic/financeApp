import mongoose from "mongoose";
import CategoryModel from "../models/category.model.js";
import TransactionModel from "../models/transaction.model.js";
import { TransactionDTO } from "../types/transaction.types.js";
import appAssert from "../utils/appAssert.js";
import { BAD_REQUEST, NOT_FOUND } from "../constants/http.js";
import TransactionTypes from "../constants/TransactionTypes.js";

type GetTransactionsReturn = {
  transactions: TransactionDTO[];
  total: number;
  pageNum: number;
  pages: number;
  limit: number;
};

type GetTransactionsParams = {
  page: number;
  filter?: string | undefined;
  sort?: "Latest" | "Oldest" | "A-Z" | "Z-A" | "Highest" | "Lowest" | undefined;
  search?: string | undefined;
  userId: mongoose.Types.ObjectId;
};

export const getTransactionsData = async ({
  page,
  filter,
  sort,
  search,
  userId,
}: GetTransactionsParams): Promise<GetTransactionsReturn> => {
  const limit = 10;
  const skip = (page - 1) * limit;

  const query: Record<string, any> = {
    userId,
    type: { $in: ["income", "expense"] },
  };

  if (filter && filter.trim()) {
    const category = await CategoryModel.findOne({ name: filter }).lean();
    if (category) {
      query.categoryId = category._id;
    }
  }

  if (search) {
    query.account = { $regex: search, $options: "i" };
  }

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    Latest: { date: -1 },
    Oldest: { date: 1 },
    "A-Z": { account: 1 },
    "Z-A": { account: -1 },
    Highest: { amount: -1 },
    Lowest: { amount: 1 },
  };

  const sortQuery = sortMap[sort as string] || { date: -1 };

  const [transactions, total] = await Promise.all([
    TransactionModel.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .populate({ path: "categoryId", select: "name" })
      .lean(),
    TransactionModel.countDocuments(query),
  ]);

  return {
    transactions,
    total,
    pageNum: page,
    pages: Math.ceil(total / limit),
    limit,
  };
};

type AddTransactionParams = {
  type: "income" | "expense";
  amount: number;
  account: string;
  categoryId: string;
  date: string;
  isRecurring?: boolean | undefined;
  dueDate?: number | undefined;
  userId: mongoose.Types.ObjectId;
};

export const addTransaction = async (request: AddTransactionParams) => {
  // Check weather category exists
  const category = await CategoryModel.findById({
    _id: request.categoryId,
  });
  appAssert(category, BAD_REQUEST, "Category not found");

  // Check weather tranasction type matches category type
  appAssert(
    category.type === request.type,
    BAD_REQUEST,
    `Transaction type "${request.type}" does not match category type "${category.type}"`
  );

  // create transaction in db
  const transaction = await TransactionModel.create({
    ...request,
    potId: undefined,
  });

  return {
    transaction: { ...transaction.toObject() },
  };
};

type EditTransactionParams = {
  transactionId: string;
  userId: mongoose.Types.ObjectId;
  type?: "income" | "expense" | undefined;
  amount?: number | undefined;
  account?: string | undefined;
  categoryId?: string | undefined;
  date?: string | undefined;
  isRecurring?: boolean | undefined;
  dueDate?: number | undefined;
};

export const editTransaction = async (request: EditTransactionParams) => {
  const { transactionId, userId, categoryId, type, ...editData } = request;

  //* check weather transaction exist
  const transaction = await TransactionModel.findOne({
    _id: transactionId,
    userId,
  });
  appAssert(transaction, NOT_FOUND, "Transaction not found");

  //* check weather category exist and category type
  if (categoryId) {
    const category = await CategoryModel.findById(categoryId);
    appAssert(category, NOT_FOUND, "Category not found");
    appAssert(
      category.type === transaction.type,
      BAD_REQUEST,
      `Transaction type ${transaction.type} does not match category type ${category.type}`
    );

    if (type) {
      appAssert(
        type === category.type,
        BAD_REQUEST,
        `Transaction type "${type}" does not match category type "${category.type}"`
      );
      transaction.type = type as TransactionTypes;
    }
    transaction.categoryId = category._id;
  } else {
    if (type) {
      appAssert(
        type === transaction.type,
        BAD_REQUEST,
        `Transaction type "${type}" does not match category type "${transaction.type}"`
      );
      transaction.type = type as TransactionTypes;
    }
  }

  //* check weather is changing isRecurring
  if (editData.isRecurring !== undefined) {
    transaction.isRecurring = editData.isRecurring;
    transaction.dueDate =
      editData.isRecurring === true ? editData.dueDate : undefined;
  }

  if (editData.account) transaction.account = editData.account;
  if (editData.amount) transaction.amount = editData.amount;
  if (editData.date) transaction.date = new Date(editData.date);

  const updatedTransaction = await transaction.save();

  return {
    transaction: { ...updatedTransaction.toObject() },
  };
};
