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

const linkProviderResponseSchema = z.pipe(
  z.object({
    id: z.number(),
    iconName: z.string(),
    name: z.string(),
    backgroundColor: z.string(),
    textColor: z.string(),
    allowedDomains: z.array(z.string()),
  }),
  z.transform(
    ({ id, iconName, name, backgroundColor, textColor, allowedDomains }) => ({
      id: id,
      iconSrc: `${import.meta.env.VITE_API_URL}/static/icons/${iconName}`,
      name: name,
      backgroundColor: backgroundColor,
      textColor: textColor,
      allowedDomains: allowedDomains,
    })
  )
);

export const linkProvidersResponseSchemaArray = z.array(
  linkProviderResponseSchema
);

export const linkProviderSchema: z.ZodMiniType<
  z.infer<typeof linkProviderResponseSchema>,
  z.infer<typeof linkProviderResponseSchema>
> = z.object({
  id: z.number(),
  iconSrc: z.string(),
  name: z.string(),
  backgroundColor: z.string(),
  textColor: z.string(),
  allowedDomains: z.array(z.string()),
});

export const linkProvidersArray = z.array(linkProviderSchema);

export const linkSchema = z
  .string()
  .check(z.minLength(1, "Can't be empty"), z.url("Enter a valid URL address"));

export const linkItemSchema = z
  .object({
    linkProvider: linkProviderSchema,
    link: linkSchema,
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
  links: z.array(linkItemSchema),
});

export const userLinksResponseSchema = z.object({
  linkProviderId: z.number(),
  link: z.string(),
  order: z.number(),
});

export const userLinksArray = z.array(userLinksResponseSchema);

export const profilePictureSchema = z.optional(
  z.file().check(
    z.refine(
      (data) =>
        data.type === "image/png" ||
        data.type === "image/jpeg" ||
        data.type === "image/jpg",
      {
        message: "Use PNG or JPG format",
      }
    ),
    z.refine(
      (data) => data.size <= PROFILE_PICTURE_SIZE_LIMIT && data.size > 0,
      {
        message: "Image must be below 5MB",
      }
    )
  )
);

export const profileDetailsSchema = z.object({
  email: z.string().check(z.trim(), z.email("Invalid email address")),
  firstName: z.string().check(z.trim(), z.minLength(1, "Can't be empty")),
  lastName: z.string().check(z.trim(), z.minLength(1, "Can't be empty")),
  profilePicture: profilePictureSchema,
});

export const authenticatedUserSchema = z.pipe(
  z.object({
    id: z.number(),
    profilePicturePath: z.nullable(z.string()),
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
  }),
  z.transform(({ id, profilePicturePath, firstName, lastName, email }) => ({
    id,
    profilePicturePath: profilePicturePath
      ? `${import.meta.env.VITE_API_URL}/${profilePicturePath}`
      : null,
    firstName,
    lastName,
    email,
  }))
);

export const publicUserProfileDataSchema = z.pipe(
  z.object({
    profilePicturePath: z.nullable(z.string()),
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    userLinks: userLinksArray,
  }),
  z.transform(
    ({ profilePicturePath, firstName, lastName, email, userLinks }) => ({
      profilePicturePath: profilePicturePath
        ? `${import.meta.env.VITE_API_URL}/${profilePicturePath}`
        : null,
      firstName,
      lastName,
      email,
      userLinks,
    })
  )
);
