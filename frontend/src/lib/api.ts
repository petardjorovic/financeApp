import API from "@/config/apiClient";
import type {
  Budget,
  Category,
  Pot,
  RawRecurringBill,
  RecurringBill,
  Theme,
  Transaction,
  User,
} from "./types";

//* AUTHENTICATION
type RegisterParams = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const register = async (
  data: RegisterParams
): Promise<{ message: string }> => API.post("/auth/register", data);

type LoginParams = {
  email: string;
  password: string;
};

export const login = async (data: LoginParams): Promise<{ message: string }> =>
  API.post("/auth/login", data);

export const logout = async () => API.get("/auth/logout");

export const verifyEmail = async (code: string): Promise<{ message: string }> =>
  API.get(`/auth/email/verify/${code}`);

export const sendPasswordResetEmail = async (data: {
  email: string;
}): Promise<{ message: string }> => API.post("/auth/password/forgot", data);

export type ResetPasswordParams = {
  verificationCode: string;
  password: string;
};

export const resetPassword = async (
  data: ResetPasswordParams
): Promise<{ message: string }> => API.post("/auth/password/reset", data);

export const getUser = async (): Promise<User> => API.get("/user");

//* CATEGORIES
export const getCategories = async (): Promise<Category[]> =>
  API.get("/categories");

//* THEMES
export const getThemes = async (): Promise<Theme[]> => API.get("/themes");

//* TRANSACTIONS
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
  id,
}: {
  id: string;
}): Promise<{ message: string }> => API.delete(`/transactions/${id}`);

//* BUDGETS
export const getBudgets = async (): Promise<Budget[]> => API.get("/budgets");

export type AddBudgetProps = {
  categoryId: string;
  limit: number;
  themeId: string;
};

export const addBudget = async (
  data: AddBudgetProps
): Promise<{ message: string }> => API.post("/budgets", data);

export type EditBudgetProps = {
  budgetId: string;
  categoryId?: string | undefined;
  limit?: number | undefined;
  themeId?: string | undefined;
};

export const editBudget = async ({
  budgetId,
  categoryId,
  limit,
  themeId,
}: EditBudgetProps): Promise<{ message: string }> =>
  API.patch(`/budgets/${budgetId}`, { categoryId, limit, themeId });

export const deleteBudget = async ({
  id,
}: {
  id: string;
}): Promise<{ message: string }> => API.delete(`/budgets/${id}`);

//* POTS
export const getPots = async (): Promise<Pot[]> => API.get("/pots");

export type AddPotProps = {
  name: string;
  target: number;
  themeId: string;
};

export const addPot = async (data: AddPotProps): Promise<{ message: string }> =>
  API.post("/pots", data);

export type EditPotProps = {
  potId: string;
  name?: string;
  target?: number;
  themeId?: string;
};

export const editPot = async ({
  potId,
  name,
  target,
  themeId,
}: EditPotProps): Promise<{ message: string }> =>
  API.patch(`/pots/${potId}`, { name, target, themeId });

export const deletePot = async ({
  id,
}: {
  id: string;
}): Promise<{ message: string }> => API.delete(`/pots/${id}`);

export type DepositPotProps = {
  potId: string;
  amount: number;
};

export const depositPot = async ({
  potId,
  amount,
}: DepositPotProps): Promise<{ message: string }> =>
  API.post(`/pots/${potId}/deposit`, { amount });

export type WithdrawPotProps = {
  potId: string;
  amount: number;
};

export const withdrawPot = async ({
  potId,
  amount,
}: WithdrawPotProps): Promise<{ message: string }> =>
  API.post(`/pots/${potId}/withdraw`, { amount });

//* RECURRING BILLS
export const getRawRecurringBills = async (): Promise<RawRecurringBill[]> =>
  API.get("/recurringBills?raw=true");

export type GetRecurringBillsProps = {
  sortBy?: string;
  search?: string;
};

export const getRecurringBills = async ({
  sortBy,
  search,
}: GetRecurringBillsProps): Promise<RecurringBill[]> => {
  const searchTerm = search ? `&search=${search}` : "";
  return API.get(`/recurringBills?sort=${sortBy}${searchTerm}`);
};

//* OVERVIEW
export const getCurrentBalance = async (): Promise<{
  currentBalance: number;
}> => API.get("/overview/currentBalance");
