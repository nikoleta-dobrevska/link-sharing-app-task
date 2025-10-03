import { type z } from "zod/mini";

import {
  type linkProvidersArray,
  type linkProviderSchema,
  type linksSchema,
  type loginSchema,
  type registerSchema,
  type userLinksArray,
} from "@/schemas";

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type LinksFormData = z.infer<typeof linksSchema>;
export type LinkProviderData = z.infer<typeof linkProviderSchema>;
export type LinkProvidersData = z.infer<typeof linkProvidersArray>;
export type UserLinksResponseData = z.infer<typeof userLinksArray>;
