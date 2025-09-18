import API from "@/config/apiClient";

type RegisterParams = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginParams = {
  email: string;
  password: string;
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

export type ResetPasswordParams = {
  verificationCode: string;
  password: string;
};

export const register = async (
  data: RegisterParams
): Promise<{ message: string }> => API.post("/auth/register", data);

export const login = async (data: LoginParams): Promise<{ message: string }> =>
  API.post("/auth/login", data);

export const logout = async () => API.get("/auth/logout");

export const verifyEmail = async (code: string): Promise<{ message: string }> =>
  API.get(`/auth/email/verify/${code}`);

export const sendPasswordResetEmail = async (data: {
  email: string;
}): Promise<{ message: string }> => API.post("/auth/password/forgot", data);

export const resetPassword = async (
  data: ResetPasswordParams
): Promise<{ message: string }> => API.post("/auth/password/reset", data);

export const getUser = async (): Promise<User> => API.get("/user");

export const getCategories = async (): Promise<Category[]> =>
  API.get("/categories");

type GetTransactionsProps = {
  page: number;
  filter: string;
  sort: string;
  search: string;
};

export const getTransactions = async ({
  page,
  filter,
  sort,
  search,
}: GetTransactionsProps): Promise<{
  transactions: Transaction[];
  total: number;
  page: number;
  pages: number;
}> =>
  API.get(
    `/transactions?page=${page}&filter=${filter}&sort=${sort}&search=${search}`
  );

export const getSingleTransaction = async (
  transactionId: string
): Promise<Transaction> => {
  const response: { transaction: Transaction } = await API.get(
    `/transactions/${transactionId}`
  );

  return response.transaction;
};

export type AddTransactionParams = {
  type: "income" | "expense";
  account: string;
  amount: number;
  categoryId: string;
  date: string;
  recurringBillId?: string;
};

export const addTransaction = async (
  values: AddTransactionParams
): Promise<{ message: string }> => API.post("/transactions", values);

export type EditTransactionParams = {
  id: string;
  type: "income" | "expense";
  account: string;
  amount: number;
  categoryId: string;
  date: string;
  recurringBillId?: string;
};

export const editTransaction = async (
  values: EditTransactionParams
): Promise<{ message: string }> => {
  const { id, ...rest } = values;
  return API.put(`/transactions/${id}`, rest);
};

export const deleteTransaction = async ({
  transactionId,
}: {
  transactionId: string;
}): Promise<{ message: string }> =>
  API.delete(`/transactions/${transactionId}`);

export const getRawRecurringBills = async (): Promise<RecurringBill[]> =>
  API.get("/recurringBills?raw=true");
