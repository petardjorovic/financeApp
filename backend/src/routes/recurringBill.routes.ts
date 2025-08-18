import { Router } from "express";
import { addRecurringBillHandler } from "../controllers/recurringBill.controller.js";

const recurringBillsRoutes = Router();

// prefix /recurringBills

recurringBillsRoutes.post("/", addRecurringBillHandler);

export default recurringBillsRoutes;
