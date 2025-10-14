import { apiClientAuthorized } from "@/config/apiClientAuthorized";

export const deleteProfilePicture = async () => {
  const response = await apiClientAuthorized.delete("/profile/profile-picture");

  return response.data;
};
