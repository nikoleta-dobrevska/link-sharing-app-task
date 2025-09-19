import { type z } from "zod/mini";

import { type loginSchema, type registerSchema } from "@/schemas";

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
