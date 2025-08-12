import mongoose from "mongoose";
import { OK } from "../constants/http.js";
import TransactionModel from "../models/transaction.model.js";
import catchErrors from "../utils/catchErrors.js";
import { getTransactionsQuerySchema } from "../schemas/transaction.schemas.js";
import { getTransactionsData } from "../services/transaction.service.js";

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

export const addTransactionHandler = catchErrors(async (req, res) => {});
