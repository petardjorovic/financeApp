import { Router } from "express";
import {
  addRecurringBillHandler,
  deleteRecurringBillHandler,
  getRecurringBillsHandler,
} from "../controllers/recurringBill.controller.js";

const recurringBillsRoutes = Router();

// prefix /recurringBills

recurringBillsRoutes.get("/", getRecurringBillsHandler);
recurringBillsRoutes.post("/", addRecurringBillHandler);
recurringBillsRoutes.delete("/:id", deleteRecurringBillHandler);

export default recurringBillsRoutes;
