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
    pages: Math.ceil(total / limit),
  });
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
    transaction,
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
