import mongoose from "mongoose";
import { CREATED, OK } from "../constants/http.js";
import TransactionModel from "../models/transaction.model.js";
import catchErrors from "../utils/catchErrors.js";
import {
  addTransactionSchema,
  getTransactionsQuerySchema,
} from "../schemas/transaction.schemas.js";
import {
  addTransaction,
  getTransactionsData,
} from "../services/transaction.service.js";

export const getTransactionsHandler = catchErrors(async (req, res) => {
  // validate request
  const queryParams = getTransactionsQuerySchema.parse(req.query);
  const { page, filter, sort, search } = queryParams;

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
  const request = addTransactionSchema.parse(req.body);

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
