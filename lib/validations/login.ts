import { z } from "zod";

export const loginValidation = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(4, "Username must be at least 4 characters"),

  password: z
    .string({ required_error: "Password is required" })
    .min(4, "Password must be at least 4 characters"),
});
