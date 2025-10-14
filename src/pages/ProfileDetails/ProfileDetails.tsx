import { ProfileDetailsForm } from "@/components/ProfileDetailsForm";
import { Typography } from "@/components/typography";

import profileDetailsClasses from "./ProfileDetails.module.scss";

export const ProfileDetails = () => {
  return (
    <>
      <div className={profileDetailsClasses["heading"]}>
        <Typography component="h1" variant="heading" size="md">
          Profile Details
        </Typography>
        <Typography
          component="p"
          variant="body"
          size="md"
          className={profileDetailsClasses["heading__subheading"]}
        >
          Add your details to create a personal touch to your profile.
        </Typography>
      </div>
      <ProfileDetailsForm />
    </>
  );
};
