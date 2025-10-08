import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useId, useMemo } from "react";
import { useForm } from "react-hook-form";

import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { queryClient } from "@/config/react-query";
import { profileDetailsSchema } from "@/schemas";
import { getAuthenticatedUserProfile } from "@/services/getAuthenticatedUserProfile";
import { updateProfileData } from "@/services/updateProfileData";
import { type ProfileDetailsData } from "@/types";

import profileDetailsFormClasses from "./ProfileDetailsForm.module.scss";

export const ProfileDetailsForm = () => {
  const id = useId();

  const { data: authenticatedUserProfileData } = useQuery({
    queryKey: ["authenticatedUserProfileData"],
    queryFn: getAuthenticatedUserProfile,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileDetailsData>({
    resolver: zodResolver(profileDetailsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    values: useMemo(
      () => authenticatedUserProfileData,
      [authenticatedUserProfileData]
    ),
  });

  const updateProfileDetailsMutation = useMutation({
    mutationFn: updateProfileData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["authenticatedUserProfileData"],
      });
    },
  });

  const onSubmit = (data: ProfileDetailsData) => {
    updateProfileDetailsMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={profileDetailsFormClasses["form"]}
    >
      <div className={profileDetailsFormClasses["image-controller"]}>
        <Label
          htmlFor={id + "-profilePicture"}
          color="gray"
          className={profileDetailsFormClasses["image-controller__label"]}
        >
          Profile picture
        </Label>
        {/*controller for image uploader 
          load profile picture path here*/}
        <Typography
          component="p"
          variant="body"
          size="sm"
          className={profileDetailsFormClasses["image-controller__req"]}
        >
          Image must be below 1024x1024px. Use PNG or JPG format.
        </Typography>
      </div>
      <div className={profileDetailsFormClasses["fields"]}>
        <div className={profileDetailsFormClasses["field"]}>
          <Label
            htmlFor={id + "-firstName"}
            color="gray"
            className={profileDetailsFormClasses["field__label"]}
          >
            First name<span aria-hidden="true">*</span>
          </Label>
          <FormField errorMessage={errors?.firstName?.message}>
            <Input
              {...register("firstName")}
              id={id + "-firstName"}
              aria-required="true"
              className={clsx(
                profileDetailsFormClasses["field__input"],
                errors?.firstName &&
                  profileDetailsFormClasses["field__input--invalid"]
              )}
              aria-invalid={!!errors?.firstName}
              type="text"
              placeholder="e.g. John"
            />
          </FormField>
        </div>
        <div className={profileDetailsFormClasses["field"]}>
          <Label
            htmlFor={id + "-lastName"}
            color="gray"
            className={profileDetailsFormClasses["field__label"]}
          >
            Last name<span aria-hidden="true">*</span>
          </Label>
          <FormField errorMessage={errors?.lastName?.message}>
            <Input
              {...register("lastName")}
              id={id + "-lastName"}
              className={clsx(
                profileDetailsFormClasses["field__input"],
                errors?.lastName &&
                  profileDetailsFormClasses["field__input--invalid"]
              )}
              aria-invalid={!!errors?.lastName}
              aria-required="true"
              type="text"
              placeholder="e.g. Appleseed"
            />
          </FormField>
        </div>
        <div className={profileDetailsFormClasses["field"]}>
          <Label
            htmlFor={id + "-email"}
            color="gray"
            className={profileDetailsFormClasses["field__label"]}
          >
            Email
          </Label>
          <FormField errorMessage={errors?.email?.message}>
            <Input
              {...register("email")}
              id={id + "-email"}
              className={clsx(
                profileDetailsFormClasses["field__input"],
                errors?.email &&
                  profileDetailsFormClasses["field__input--invalid"]
              )}
              aria-invalid={!!errors?.email}
              aria-required="false"
              type="email"
              placeholder="e.g. email@example.com"
            />
          </FormField>
        </div>
      </div>
      <span className={profileDetailsFormClasses["form__separator"]} />
      <Button
        variant="primary"
        type="submit"
        size="md"
        className={profileDetailsFormClasses["form__save-btn"]}
      >
        Save
      </Button>
    </form>
  );
};
