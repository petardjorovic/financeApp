export type Transaction = {
  _id: string;
  userId: string;
  type: "income" | "expense";
  amount: number;
  account: string;
  categoryId: {
    _id: string;
    name: string;
  };
  date: string;
  recurringBillId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type User = {
  _id: string;
  email: string;
  fullName: string;
  verified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  _id: string;
  name: string;
  type: "income" | "expense";
};

export type RecurringBill = {
  _id: string;
  userId: string;
  name: string;
  dueDate: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isPaidThisMonth: boolean;
  paidAmountThisMonth: number;
};

export type Budget = {
  _id: string;
  userId: string;
  categoryId: {
    _id: string;
    name: string;
  };
  limit: number;
  themeId: {
    _id: string;
    name: string;
    color: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  spent: number;
  latestSpending: {
    _id: string;
    amount: number;
    account: string;
    type: "expense" | "string";
    date: string;
  }[];
};

export type Theme = {
  _id: string;
  name: string;
  color: string;
};
