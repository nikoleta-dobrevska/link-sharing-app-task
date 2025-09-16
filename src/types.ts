import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().trim().nonempty("Can't be empty"),
    lastName: z.string().trim().nonempty("Can't be empty"),
    email: z.string().nonempty("Can't be empty").email("Invalid email address"),
    password: z
      .string()
      .nonempty("Can't be empty")
      .min(8, "Please check again"),
    confirmPassword: z.string().nonempty("Can't be empty"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
