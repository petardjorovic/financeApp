import API from "@/config/apiClient";

type LoginParams = {
  email: string;
  password: string;
};

export const login = (data: LoginParams): Promise<{ message: string }> =>
  API.post("/auth/login", data);
