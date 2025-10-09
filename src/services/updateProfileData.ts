import { apiClientAuthorized } from "@/config/apiClientAuthorized";
import { type ProfileDetailsData } from "@/types";

export const updateProfileData = async (data: ProfileDetailsData) => {
  const formData = new FormData();

  if (data.profilePicture) {
    formData.append("profilePicture", data.profilePicture);
  }

  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("email", data.email);

  const response = await apiClientAuthorized.put("/profile", formData);

  return response.data;
};
