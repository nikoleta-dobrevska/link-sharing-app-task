import { ProfileDetailsForm } from "@/components/ProfileDetailsForm";
import { Typography } from "@/components/typography";

export const ProfileDetails = () => {
  return (
    <>
      <div>
        <Typography component="h1" variant="heading" size="md">
          Profile Details
        </Typography>
        <Typography component="p" variant="body" size="md">
          Add your details to create a personal touch to your profile.
        </Typography>
      </div>
      <ProfileDetailsForm />
    </>
  );
};
