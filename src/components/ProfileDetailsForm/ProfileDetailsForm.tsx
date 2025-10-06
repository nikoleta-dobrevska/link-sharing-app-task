import { useQuery } from "@tanstack/react-query";
import { useId } from "react";
import { useForm } from "react-hook-form";

import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { getAuthenticatedUserProfile } from "@/services/getAuthenticatedUserProfile";

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
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <div>
          <Label htmlFor={id + "-profilePicture"} color="gray">
            Profile picture
          </Label>
          {/*controller for image uploader 
          load profile picture path here*/}
          <Typography component="p" variant="body" size="sm">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </Typography>
        </div>
      </fieldset>
      <fieldset>
        <div>
          <Label htmlFor={id + "-firstName"} color="gray">
            First name*
          </Label>
          <FormField //errorMessage={errors?.firstName?.message}
          >
            <Input
              {...register("firstName")}
              id={id + "-firstName"}
              defaultValue={authenticatedUserProfileData?.firstName}
              aria-required="true"
              className={
                errors?.firstName
                  ? "form__input--invalid"
                  : "form__input--valid"
              }
              aria-invalid={!!errors?.firstName}
              type="text"
              placeholder="e.g. John"
            />
          </FormField>
        </div>
        <div>
          <Label htmlFor={id + "-lastName"} color="gray">
            Last name*
          </Label>
          <FormField //errorMessage={errors?.lastName?.message}
          >
            <Input
              {...register("lastName")}
              id={id + "-lastName"}
              className={
                errors?.lastName ? "form__input--invalid" : "form__input--valid"
              }
              defaultValue={authenticatedUserProfileData?.lastName}
              aria-invalid={!!errors?.lastName}
              aria-required="true"
              type="text"
              placeholder="e.g. Appleseed"
            />
          </FormField>
        </div>
        <div>
          <Label htmlFor={id + "-email"} color="gray">
            Email
          </Label>
          <FormField //errorMessage={errors?.email?.message}
          >
            <Input
              {...register("email")}
              id={id + "-email"}
              className={
                errors?.email ? "form__input--invalid" : "form__input--valid"
              }
              defaultValue={authenticatedUserProfileData?.email}
              aria-invalid={!!errors?.email}
              aria-required="false"
              type="email"
              placeholder="e.g. email@example.com"
            />
          </FormField>
        </div>
      </fieldset>
      <Button variant="primary" type="submit" size="md">
        Save
      </Button>
    </form>
  );
};
