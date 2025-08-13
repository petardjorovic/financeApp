import { Router } from "express";
import {
  addBudgetHandler,
  getBudgetsHandler,
} from "../controllers/budget.controller.js";

const budgetRoutes = Router();

// prefix /budgets
budgetRoutes.get("/", getBudgetsHandler);
budgetRoutes.post("/", addBudgetHandler);

export default budgetRoutes;
