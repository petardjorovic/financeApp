import { Router } from "express";
import {
  addTransactionHandler,
  deleteTransactionHandler,
  editTransactionHandler,
  exportTransactionsHandler,
  getSingleTransactionHandler,
  getTransactionsHandler,
} from "../controllers/transactions.controller.js";

const transactionRoutes = Router();

// prefix /transactions

transactionRoutes.get("/", getTransactionsHandler);
transactionRoutes.get("/export", exportTransactionsHandler);
transactionRoutes.get("/:id", getSingleTransactionHandler);
transactionRoutes.post("/", addTransactionHandler);
transactionRoutes.put("/:id", editTransactionHandler);
transactionRoutes.delete("/:id", deleteTransactionHandler);

export default transactionRoutes;
