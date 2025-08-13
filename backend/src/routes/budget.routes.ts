import { Router } from "express";
import {
  addBudgetHandler,
  deleteBudgetHandler,
  editBudgetHandler,
  getBudgetsHandler,
} from "../controllers/budget.controller.js";

const budgetRoutes = Router();

// prefix /budgets
budgetRoutes.get("/", getBudgetsHandler);
budgetRoutes.post("/", addBudgetHandler);
budgetRoutes.patch("/:id", editBudgetHandler);
budgetRoutes.delete("/:id", deleteBudgetHandler);

export default budgetRoutes;
