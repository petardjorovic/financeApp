import { Router } from "express";
import {
  getCurrentBalanceHandler,
  getIncomeExpenseDataHandler,
  getOverviewDataHandler,
} from "../controllers/overview.controller.js";

const overviewRoutes = Router();

// prefix /overview

overviewRoutes.get("/", getOverviewDataHandler);
overviewRoutes.get("/currentBalance", getCurrentBalanceHandler);
overviewRoutes.get("/incomeExpenseData", getIncomeExpenseDataHandler);

export default overviewRoutes;
