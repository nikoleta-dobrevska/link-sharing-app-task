import { type z } from "zod/mini";

import {
  type loginSchema,
  type profilePictureSchema,
  type registerSchema,
} from "@/schemas";

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ProfilePictureData = z.infer<typeof profilePictureSchema>;
