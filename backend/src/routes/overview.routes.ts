import { Router } from "express";
import {
  getCurrentBalanceHandler,
  getOverviewDataHandler,
} from "../controllers/overview.controller.js";

const overviewRoutes = Router();

// prefix /overview

overviewRoutes.get("/", getOverviewDataHandler);
overviewRoutes.get("/currentBalance", getCurrentBalanceHandler);

export default overviewRoutes;
