import API from "@/config/apiClient";

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

export type ResetPasswordParams = {
  verificationCode: string;
  password: string;
};

export const login = async (data: LoginParams): Promise<{ message: string }> =>
  API.post("/auth/login", data);

export const register = async (
  data: RegisterParams
): Promise<{ message: string }> => API.post("/auth/register", data);

export const verifyEmail = async (code: string): Promise<{ message: string }> =>
  API.get(`/auth/email/verify/${code}`);

export const sendPasswordResetEmail = async (data: {
  email: string;
}): Promise<{ message: string }> => API.post("/auth/password/forgot", data);

export const resetPassword = async (
  data: ResetPasswordParams
): Promise<{ message: string }> => API.post("/auth/password/reset", data);

export const getUser = async (): Promise<User> => API.get("/user");
