import { Router } from "express";
import {
  addTransactionHandler,
  deleteTransactionHandler,
  editTransactionHandler,
  getTransactionsHandler,
  updateTransactionHandler,
} from "../controllers/transactions.controller.js";

const transactionRoutes = Router();

// prefix /transactions

transactionRoutes.get("/", getTransactionsHandler);
transactionRoutes.post("/", addTransactionHandler);
transactionRoutes.put("/:id", updateTransactionHandler);
transactionRoutes.patch("/:id", editTransactionHandler);
transactionRoutes.delete("/:id", deleteTransactionHandler);

export default transactionRoutes;
