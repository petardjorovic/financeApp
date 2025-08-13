import { Router } from "express";
import { addBudgetHandler } from "../controllers/budget.controller.js";

const budgetRoutes = Router();

// prefix /budgets
budgetRoutes.post("/", addBudgetHandler);

export default budgetRoutes;
