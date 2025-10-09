import { type z } from "zod/mini";

import {
  type authenticatedUserSchema,
  type linkProvidersArray,
  type linkProviderSchema,
  type linksSchema,
  type loginSchema,
  type profileDetailsSchema,
  type profilePictureSchema,
  type registerSchema,
  type userLinksArray,
} from "@/schemas";

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type LinksFormData = z.infer<typeof linksSchema>;
export type LinkProviderData = z.infer<typeof linkProviderSchema>;
export type LinkProvidersData = z.infer<typeof linkProvidersArray>;
export type UserLinksResponseData = z.infer<typeof userLinksArray>;
export type ProfileDetailsData = z.infer<typeof profileDetailsSchema>;
export type AuthenticatedUserData = z.infer<typeof authenticatedUserSchema>;
export type ProfilePictureData = z.infer<typeof profilePictureSchema>;
