import { Router } from "express";
import {
  addPotHandler,
  deletePotHandler,
  depositPotHandler,
  editPotHandler,
  getPotsHandler,
  withdrawPotHandler,
} from "../controllers/pots.controller.js";

const potsRoutes = Router();

//* prefix /pots

potsRoutes.get("/", getPotsHandler);
potsRoutes.post("/", addPotHandler);
potsRoutes.patch("/:id", editPotHandler);
potsRoutes.delete("/:id", deletePotHandler);
potsRoutes.post("/:id/deposit", depositPotHandler);
potsRoutes.post("/:id/withdraw", withdrawPotHandler);

export default potsRoutes;
