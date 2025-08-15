import { Router } from "express";
import {
  addPotHandler,
  depositPotHandler,
} from "../controllers/pots.controller.js";

const potsRoutes = Router();

//* prefix /pots

potsRoutes.post("/", addPotHandler);
potsRoutes.post("/:id/deposit", depositPotHandler);

export default potsRoutes;
