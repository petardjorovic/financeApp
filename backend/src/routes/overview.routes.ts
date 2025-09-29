import { Router } from "express";
import { getCurrentBalanceHandler } from "../controllers/overview.controller.js";

const overviewRoutes = Router();

// prefix /overview

overviewRoutes.get("/currentBalance", getCurrentBalanceHandler);

export default overviewRoutes;
