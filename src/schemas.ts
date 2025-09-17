import { z } from "zod/mini";

export const registerSchema = z
  .object({
    firstName: z.string().check(z.trim(), z.minLength(1, "Can't be empty")),
    lastName: z.string().check(z.trim(), z.minLength(1, "Can't be empty")),
    email: z
      .string()
      .check(
        z.trim(),
        z.minLength(1, "Can't be empty"),
        z.email("Invalid email address")
      ),
    password: z.string().check(z.minLength(8, "Please check again")),
    confirmPassword: z.string().check(z.minLength(1, "Can't be empty")),
  })
  .check(
    z.refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
  );

export type RegisterFormData = z.infer<typeof registerSchema>;
