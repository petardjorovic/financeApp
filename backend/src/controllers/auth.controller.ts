import z from "zod";
import { CREATED, OK } from "../constants/http.js";
import catchErrors from "../utils/catchErrors.js";
import { createAccount } from "../services/auth.service.js";
import { sethAuthCookies } from "../utils/cookies.js";

const registerSchema = z
  .object({
    email: z.email(),
    fullName: z.string().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call service
  const { user, accessToken, refreshToken } = await createAccount(request);

  // return response
  sethAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});
