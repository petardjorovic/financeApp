import { CREATED, OK } from "../constants/http.js";
import {
  addRecurringBillSchema,
  getRecurringBillsSchema,
  recurringBillIdSchema,
} from "../schemas/recurringBill.schemas.js";
import {
  addRecurringBill,
  getRecurringBills,
} from "../services/recurringBill.service.js";
import catchErrors from "../utils/catchErrors.js";
import deleteRecurringBillTransaction from "../utils/deleteRecurringBillTransaction.js";

export const getRecurringBillsHandler = catchErrors(async (req, res) => {
  // validate request
  const queryParams = getRecurringBillsSchema.parse(req.query);

  // call service
  const recurringBills = await getRecurringBills({
    ...queryParams,
    userId: req.userId,
  });

  // return response
  return res.status(OK).json(recurringBills);
});

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
    .json({ message: "Recurring bill successfully added" });
});

export const deleteRecurringBillHandler = catchErrors(async (req, res) => {
  // validate request
  const recurringBillId = recurringBillIdSchema.parse(req.params.id);

  await deleteRecurringBillTransaction({ recurringBillId, userId: req.userId });

  return res.status(OK).json({ message: "Recurring bill removed" });
});
