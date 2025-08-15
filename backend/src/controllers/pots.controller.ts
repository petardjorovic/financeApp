import { CREATED, OK } from "../constants/http.js";
import {
  addPotSchema,
  depositPotSchema,
  potIdSchema,
} from "../schemas/pots.schemas.js";
import { addPot, depositPot } from "../services/pot.service.js";
import catchErrors from "../utils/catchErrors.js";

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

export const depositPotHandler = catchErrors(async (req, res) => {
  // validate request
  const potId = potIdSchema.parse(req.params.id);
  const amount = depositPotSchema.parse(req.body.amount);

  // call service
  const { pot } = await depositPot({ userId: req.userId, potId, amount });

  // return response
  return res.status(OK).json({
    message: "Successfull deposit",
    pot,
  });
});
