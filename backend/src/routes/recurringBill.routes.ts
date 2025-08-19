import { Router } from "express";
import {
  addRecurringBillHandler,
  deleteRecurringBillHandler,
} from "../controllers/recurringBill.controller.js";

const recurringBillsRoutes = Router();

// prefix /recurringBills

recurringBillsRoutes.post("/", addRecurringBillHandler);
recurringBillsRoutes.delete("/:id", deleteRecurringBillHandler);

export default recurringBillsRoutes;
