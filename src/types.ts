import { type z } from "zod/mini";

import {
  type linksSchema,
  type loginSchema,
  type registerSchema,
} from "@/schemas";

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type LinksFormData = z.infer<typeof linksSchema>;
