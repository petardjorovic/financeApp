import { CREATED, NOT_FOUND, OK } from "../constants/http.js";
import catchErrors from "../utils/catchErrors.js";
import {
  editTransactionSchema,
  getTransactionsQuerySchema,
  transactionIdSchema,
  transactionSchema,
} from "../schemas/transaction.schemas.js";
import {
  addTransaction,
  editTransaction,
  getTransactionsData,
} from "../services/transaction.service.js";
import TransactionModel from "../models/transaction.model.js";
import appAssert from "../utils/appAssert.js";
import { Parser } from "@json2csv/plainjs/index.js";

export const getTransactionsHandler = catchErrors(async (req, res) => {
  // validate request
  const queryParams = getTransactionsQuerySchema.parse(req.query);

  // call service
  const { transactions, total, pageNum, pages, limit } =
    await getTransactionsData({
      ...queryParams,
      userId: req.userId,
    });

  // return resonse
  res.status(OK).json({
    transactions,
    total,
    page: pageNum,
    pages,
  });
});

export const getSingleTransactionHandler = catchErrors(async (req, res) => {
  const transactionId = transactionIdSchema.parse(req.params.id);

  const transaction = await TransactionModel.findOne({
    _id: transactionId,
    userId: req.userId,
  }).populate({ path: "categoryId", select: "name" });
  appAssert(transaction, NOT_FOUND, "Transaction not found");

  return res.status(OK).json({ transaction });
});

export const addTransactionHandler = catchErrors(async (req, res) => {
  // validate request
  const request = transactionSchema.parse(req.body);

  // call service
  const { transaction } = await addTransaction({
    ...request,
    userId: req.userId,
  });

  // send response
  return res.status(CREATED).json({
    message: "Transaction successfully added",
    transaction,
  });
});

export const editTransactionHandler = catchErrors(async (req, res) => {
  // validate request
  const transactionId = transactionIdSchema.parse(req.params.id);
  const request = transactionSchema.parse(req.body);

  // call service
  const { transaction } = await editTransaction({
    ...request,
    transactionId,
    userId: req.userId,
  });

  // return response
  return res.status(OK).json({
    message: "Transaction successfully edit",
  });
});

export const deleteTransactionHandler = catchErrors(async (req, res) => {
  const transactionId = transactionIdSchema.parse(req.params.id);

  const deleted = await TransactionModel.findOneAndDelete({
    _id: transactionId,
    userId: req.userId,
  });
  appAssert(deleted, NOT_FOUND, "Transaction not found");

  return res.status(OK).json({
    message: "Transaction removed",
  });
});

type Transaction = {
  _id: string;
  userId: string;
  type: string;
  amount: number;
  account: string;
  categoryId: {
    _id: string;
    name: string;
  };
  date: Date;
  createdAt: string;
  updatedAt: string;
  __v: number;
  recurringBillId?: string;
};

export const exportTransactionsHandler = catchErrors(async (req, res) => {
  const transactions = await TransactionModel.find({
    userId: req.userId,
    type: { $in: ["income", "expense"] },
  })
    .sort({ date: -1 })
    .populate("categoryId", "name")
    .lean<Transaction[]>();

  const data = transactions.map((t) => ({
    Date: t.date.toISOString().split("T")[0],
    Category: t.categoryId.name,
    "Recipient / Sender": t.account,
    Type: t.type,
    Amount: t.amount,
  }));

  const parser = new Parser({
    fields: ["Date", "Category", "Recipient / Sender", "Type", "Amount"],
  });
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("transactions.csv");
  res.send(csv);
});
