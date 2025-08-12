import { Router } from "express";
import {
  addTransactionHandler,
  getTransactionsHandler,
} from "../controllers/transactions.controller.js";

const transactionRoutes = Router();

// prefix /transactions

transactionRoutes.get("/", getTransactionsHandler);
transactionRoutes.post("/", addTransactionHandler);

export default transactionRoutes;
