import { Router } from "express";
import authRoutes from "./auth.routes.js";
import authenticate from "../middleware/autheticate.js";
import userRoutes from "./user.routes.js";
import sessionRoutes from "./session.route.js";
import themeRoutes from "./theme.routes.js";
import { OK } from "../constants/http.js";
import categoryRoutes from "./category.routes.js";
import transactionRoutes from "./transaction.routes.js";
import budgetRoutes from "./budget.routes.js";
import potsRoutes from "./pots.routes.js";
import recurringBillsRoutes from "./recurringBill.routes.js";
import overviewRoutes from "./overview.routes.js";

const routes = Router();

routes.get("/", (req, res) => {
  res.status(OK).json({
    message: "healty",
  });
});

routes.use("/auth", authRoutes);

// protected routes
routes.use("/user", authenticate, userRoutes);
routes.use("/sessions", authenticate, sessionRoutes);
routes.use("/transactions", authenticate, transactionRoutes);
routes.use("/categories", authenticate, categoryRoutes);
routes.use("/themes", authenticate, themeRoutes);
routes.use("/budgets", authenticate, budgetRoutes);
routes.use("/pots", authenticate, potsRoutes);
routes.use("/recurringBills", authenticate, recurringBillsRoutes);
routes.use("/overview", authenticate, overviewRoutes);

export default routes;
