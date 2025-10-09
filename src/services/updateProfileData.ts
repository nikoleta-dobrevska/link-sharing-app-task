import { apiClientAuthorized } from "@/config/apiClientAuthorized";
import { type ProfileDetailsData } from "@/types";

export const updateProfileData = async (data: ProfileDetailsData) => {
  const response = await apiClientAuthorized.put("/profile", data);

  return response.data;
};
