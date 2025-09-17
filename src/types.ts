import { type z } from "zod/mini";

import { type registerSchema } from "@/schemas";

export type RegisterFormData = z.infer<typeof registerSchema>;
