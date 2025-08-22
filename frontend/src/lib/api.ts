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

export const login = (data: LoginParams): Promise<{ message: string }> =>
  API.post("/auth/login", data);

export const register = (data: RegisterParams): Promise<User> =>
  API.post("/auth/register", data);
