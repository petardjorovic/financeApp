import { Router } from "express";
import {
  addTransactionHandler,
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

export default transactionRoutes;
