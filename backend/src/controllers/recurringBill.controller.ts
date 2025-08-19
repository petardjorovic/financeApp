import { CREATED, OK } from "../constants/http.js";
import {
  addRecurringBillSchema,
  recurringBillIdSchema,
} from "../schemas/recurringBill.schemas.js";
import { addRecurringBill } from "../services/recurringBill.service.js";
import catchErrors from "../utils/catchErrors.js";
import deleteRecurringBillTransaction from "../utils/deleteRecurringBillTransaction.js";

export const addRecurringBillHandler = catchErrors(async (req, res) => {
  // validate request
  const request = addRecurringBillSchema.parse(req.body);

  // call service
  const { recurringBill } = await addRecurringBill({
    ...request,
    userId: req.userId,
  });

  // return response
  return res
    .status(CREATED)
    .json({ message: "Recurring bill successfully added", recurringBill });
});

export const deleteRecurringBillHandler = catchErrors(async (req, res) => {
  // validate request
  const recurringBillId = recurringBillIdSchema.parse(req.params.id);

  await deleteRecurringBillTransaction({ recurringBillId, userId: req.userId });

  return res.status(OK).json({ message: "Recurring bill removed" });
});
