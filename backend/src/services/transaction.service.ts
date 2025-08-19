import mongoose from "mongoose";
import CategoryModel from "../models/category.model.js";
import TransactionModel from "../models/transaction.model.js";
import { TransactionDTO } from "../types/transaction.types.js";
import appAssert from "../utils/appAssert.js";
import { BAD_REQUEST, NOT_FOUND } from "../constants/http.js";
import TransactionTypes from "../constants/TransactionTypes.js";
import RecurringBillModel from "../models/recurringBill.js";

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
  recurringBillId?: string | undefined;
  userId: mongoose.Types.ObjectId;
};

export const addTransaction = async (request: AddTransactionParams) => {
  // check category
  const category = await CategoryModel.findById({
    _id: request.categoryId,
  });
  appAssert(category, BAD_REQUEST, "Category not found");
  appAssert(
    category.type === request.type,
    BAD_REQUEST,
    `Transaction type "${request.type}" does not match category type "${category.type}"`
  );

  // case recurringBill exists
  if (request.recurringBillId) {
    const recurringBill = await RecurringBillModel.findOne({
      _id: request.recurringBillId,
      userId: request.userId,
    });
    appAssert(recurringBill, BAD_REQUEST, "Recurring bill not found");
    appAssert(
      recurringBill.categoryId.toString() === category._id.toString(),
      BAD_REQUEST,
      `Not found category`
    );
    appAssert(
      recurringBill.name === request.account,
      BAD_REQUEST,
      "Wrong input from account"
    );
  }

  // create transaction in db
  const transaction = await TransactionModel.create({
    userId: request.userId,
    amount: request.amount,
    date: new Date(request.date),
    categoryId: request.categoryId,
    account: request.account,
    type: request.type,
    recurringBillId: request.recurringBillId,
    potId: undefined,
  });

  return {
    transaction: { ...transaction.toObject() },
  };
};

type EditTransactionParams = {
  transactionId: string;
  userId: mongoose.Types.ObjectId;
  type: "income" | "expense";
  amount: number;
  account: string;
  categoryId: string;
  date: string;
  recurringBillId?: string | undefined;
};

export const editTransaction = async (request: EditTransactionParams) => {
  const { transactionId, userId, recurringBillId, ...editData } = request;

  //* check weather transaction exist
  const transaction = await TransactionModel.findOne({
    _id: transactionId,
    userId,
  });
  appAssert(transaction, NOT_FOUND, "Transaction not found");

  //* check category
  const category = await CategoryModel.findById(editData.categoryId);
  appAssert(category, NOT_FOUND, "Category not found");
  appAssert(
    category.type === editData.type,
    BAD_REQUEST,
    `Transaction type ${transaction.type} does not match category type ${category.type}`
  );

  //* chack recurringBill
  if (recurringBillId) {
    const recurringBill = await RecurringBillModel.findOne({
      _id: recurringBillId,
      userId,
    });
    appAssert(recurringBill, NOT_FOUND, "Recurring bill not found");
    appAssert(
      recurringBill.categoryId.toString() === category._id.toString(),
      BAD_REQUEST,
      `Category mismatch with category`
    );
    appAssert(
      recurringBill.name.trim() === editData.account.trim(),
      BAD_REQUEST,
      "Account does not match recurring bill"
    );
  }

  transaction.type = editData.type as TransactionTypes;
  transaction.amount = editData.amount;
  transaction.account = editData.account;
  transaction.categoryId = new mongoose.Types.ObjectId(editData.categoryId);
  transaction.date = new Date(editData.date);
  if (recurringBillId) {
    transaction.recurringBillId = new mongoose.Types.ObjectId(recurringBillId);
  }
  if (!recurringBillId && transaction.recurringBillId) {
    transaction.recurringBillId = undefined;
  }

  const updatedTransaction = await transaction.save();

  return {
    transaction: { ...updatedTransaction.toObject() },
  };
};
