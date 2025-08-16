import { CREATED, OK } from "../constants/http.js";
import PotModel from "../models/pot.model.js";
import {
  addPotSchema,
  depositPotSchema,
  editPotSchema,
  potIdSchema,
} from "../schemas/pots.schemas.js";
import {
  addPot,
  depositPot,
  editPot,
  withdrawPot,
} from "../services/pot.service.js";
import catchErrors from "../utils/catchErrors.js";

export const getPotsHandler = catchErrors(async (req, res) => {
  const pots = await PotModel.find({ userId: req.userId });

  return res.status(OK).json(pots);
});

export const addPotHandler = catchErrors(async (req, res) => {
  // validate request
  const request = addPotSchema.parse(req.body);

  // call service
  const { pot } = await addPot({ ...request, userId: req.userId });

  // return response
  return res.status(CREATED).json({
    message: "Pot successfully added",
    pot,
  });
});

export const editPotHandler = catchErrors(async (req, res) => {
  // validate request
  const potId = potIdSchema.parse(req.params.id);
  const request = editPotSchema.parse(req.body);

  // call service
  const pot = await editPot({ ...request, potId, userId: req.userId });

  // return response
  return res.status(OK).json({ message: "Pot successfully edited", pot });
});

export const depositPotHandler = catchErrors(async (req, res) => {
  // validate request
  const potId = potIdSchema.parse(req.params.id);
  const amount = depositPotSchema.parse(req.body.amount);

  // call service
  const { pot, transaction } = await depositPot({
    userId: req.userId,
    potId,
    amount,
  });

  // return response
  return res.status(OK).json({
    message: "Successfull deposit",
    pot,
    transaction,
  });
});

export const withdrawPotHandler = catchErrors(async (req, res) => {
  // validate request
  const potId = potIdSchema.parse(req.params.id);
  const amount = depositPotSchema.parse(req.body.amount);

  // call service
  const { pot, transaction } = await withdrawPot({
    potId,
    amount,
    userId: req.userId,
  });

  return res.status(OK).json({
    message: "Successfull withdraw",
    pot,
    transaction,
  });
});
