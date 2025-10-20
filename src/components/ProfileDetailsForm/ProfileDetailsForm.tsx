import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useId, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import FloppyDiscIcon from "@/assets/svgr/FloppyDisk.svg?react";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/form/FormField";
import { ImageUploader } from "@/components/ui/form/ImageUploader";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { queryClient } from "@/config/react-query";
import { useAuthenticatedUserProfileData } from "@/queries";
import { profileDetailsSchema } from "@/schemas";
import { deleteProfilePicture } from "@/services/deleteProfilePicture";
import { updateProfileData } from "@/services/updateProfileData";
import { type ProfileDetailsData } from "@/types";

import profileDetailsFormClasses from "./ProfileDetailsForm.module.scss";

export const ProfileDetailsForm = () => {
  const id = useId();

  const { data: authenticatedUserProfileData } =
    useAuthenticatedUserProfileData();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProfileDetailsData>({
    resolver: zodResolver(profileDetailsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    values: {
      firstName: authenticatedUserProfileData?.firstName ?? "",
      lastName: authenticatedUserProfileData?.lastName ?? "",
      email: authenticatedUserProfileData?.email ?? "",
    },
  });

  const preview = watch("profilePicture");

  const updateProfileDetailsMutation = useMutation({
    mutationFn: updateProfileData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["authenticatedUserProfileData"],
      });

      toast.success("Your changes have been successfully saved!", {
        icon: <FloppyDiscIcon aria-hidden="true" />,
      });

      removePreview();
    },
  });

  const deleteProfilePictureMutation = useMutation({
    mutationFn: deleteProfilePicture,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["authenticatedUserProfileData"],
      });

      removePreview();
    },
  });

  const onSubmit = (data: ProfileDetailsData) => {
    updateProfileDetailsMutation.mutate(data);
  };

  const removePreview = () => {
    if (previewUrl !== undefined) {
      setValue("profilePicture", undefined);
      URL.revokeObjectURL(previewUrl);
    }
  };

  const onDeleteProfilePicture = () => {
    deleteProfilePictureMutation.mutate();
  };

  const previewUrl = useMemo(() => {
    return preview && URL.createObjectURL(preview);
  }, [preview]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={profileDetailsFormClasses["form"]}
      >
        <div className={profileDetailsFormClasses["image-container"]}>
          <Label
            htmlFor={id + "-profilePicture"}
            color="gray"
            className={profileDetailsFormClasses["image-container__label"]}
          >
            Profile picture
          </Label>
          <div
            className={profileDetailsFormClasses["image-container__controller"]}
          >
            <Controller
              control={control}
              name="profilePicture"
              render={({ field: { onChange, name } }) => (
                <ImageUploader
                  id={id + "-profilePicture"}
                  name={name}
                  ariaDescribedBy={id + "-profilePictureNote"}
                  ariaRequired={false}
                  preview={
                    previewUrl ??
                    authenticatedUserProfileData?.profilePicturePath ??
                    undefined
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }
                  }}
                  errorMessage={errors?.profilePicture?.message}
                />
              )}
            />
            {preview && (
              <button
                onClick={removePreview}
                className={
                  profileDetailsFormClasses["image-container__remove-btn"]
                }
                type="button"
              >
                Remove Preview
              </button>
            )}
            {authenticatedUserProfileData?.profilePicturePath && (
              <button
                onClick={onDeleteProfilePicture}
                className={
                  profileDetailsFormClasses["image-container__delete-btn"]
                }
                type="button"
              >
                Delete Picture
              </button>
            )}
          </div>
          <Typography
            component="p"
            variant="body"
            size="sm"
            className={profileDetailsFormClasses["image-container__text"]}
            id={id + "-profilePictureNote"}
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
                className={profileDetailsFormClasses["profile-details-input"]}
                invalid={!!errors?.firstName}
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
                className={profileDetailsFormClasses["profile-details-input"]}
                invalid={!!errors?.lastName}
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
                className={profileDetailsFormClasses["profile-details-input"]}
                invalid={!!errors?.email}
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
    </>
  );
};
