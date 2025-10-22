import axios from "axios";

import { publicUserProfileDataSchema } from "@/schemas";

export const getPublicUserProfileData = async (
  userId?: number,
  signal?: AbortSignal
) => {
  if (!userId) {
    return;
  }

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/profile/${userId}`,
    { signal }
  );

  const validatedResponse = publicUserProfileDataSchema.parse(response.data);

  validatedResponse.userLinks.sort((prev, next) => prev.order - next.order);

  return validatedResponse;
};
