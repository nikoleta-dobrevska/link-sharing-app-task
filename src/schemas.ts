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

export const linkSchema = z
  .object({
    linkProvider: z.object({
      id: z.number(),
      allowedDomains: z.array(z.string()),
    }),
    link: z
      .string()
      .check(z.minLength(1, "Can't be empty"), z.url("Enter a URL address")),
  })
  .check(
    z.refine(
      (data) =>
        data.linkProvider.allowedDomains.some((domain) =>
          data.link.includes(domain)
        ),
      {
        message: "Please check the URL",
        path: ["link"],
      }
    )
  );

export const linksSchema = z.object({
  links: z.array(linkSchema),
});
