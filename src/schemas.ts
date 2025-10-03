import { z } from "zod/mini";

import { PROFILE_PICTURE_SIZE_LIMIT } from "@/constants";

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

export const loginSchema = z.object({
  email: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, "Can't be empty"),
      z.email("Invalid email address")
    ),
  password: z.string().check(z.minLength(8, "Please check again")),
});

export const profilePictureSchema = z.object({
  profilePicture: z.file().check(
    z.refine(
      (data) =>
        data.type === "image/png" ||
        data.type === "image/jpeg" ||
        data.type === "image/jpg",
      {
        message: "Use PNG or JPG format",
        path: ["profilePicture"],
      }
    ),
    z.refine((data) => data.size <= PROFILE_PICTURE_SIZE_LIMIT, {
      message: "Image must be below 1024x1024px",
      path: ["profilePicture"],
    })
  ),
});
