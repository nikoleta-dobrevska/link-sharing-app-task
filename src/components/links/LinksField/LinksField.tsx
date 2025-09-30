import { type UseMutationResult } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useId } from "react";
import {
  type Control,
  Controller,
  type FieldArrayWithId,
  type UseFormRegister,
} from "react-hook-form";

import LinksIcon from "@/assets/svgr/links.svg?react";
import { LinkProviderDropDownField } from "@/components/links/LinkProviderDropDownField";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { type LinkProviderData, type LinksFormData } from "@/types";

type LinksFieldProps = {
  index: number;
  errorMessage: string | undefined;
  control: Control<LinksFormData>;
  linkProviders: Array<LinkProviderData>;
  register: UseFormRegister<LinksFormData>;
  deleteLinkMutation: UseMutationResult<unknown, Error, number, unknown>;
  field: FieldArrayWithId<LinksFormData>;
};

export const LinksField = ({
  index,
  errorMessage,
  control,
  linkProviders,
  register,
  deleteLinkMutation,
  field,
}: LinksFieldProps) => {
  const id = useId();

  return (
    <div>
      <button
        type="button"
        onClick={() => deleteLinkMutation.mutate(field.linkProvider.id)}
      >
        Remove
      </button>
      <Label htmlFor={id + `-platform`} color="dark-gray">
        Platform
      </Label>
      <FormField>
        <Controller
          control={control}
          name={`links.${index}.linkProvider`}
          rules={{ required: "true" }}
          render={({ field: { onChange, value } }) => (
            <LinkProviderDropDownField
              dropDownFieldId={id + `-platform`}
              onChange={onChange}
              selected={value}
              options={linkProviders}
              placeholder="Choose platform"
            />
          )}
        />
      </FormField>
      <Label htmlFor={id + `link-${index}`} color="dark-gray">
        Link {index + 1}
      </Label>
      <FormField icon={<LinksIcon />} errorMessage={errorMessage}>
        <Input
          id={id + `link-${index}`}
          {...register(`links.${index}.link`)}
          aria-required="true"
          aria-invalid={!!errorMessage}
          className={clsx(
            errorMessage ? ["form__input--invalid"] : ["form__input--valid"]
          )}
          type="text"
          placeholder="e.g. https://www.github.com/johnappleseed"
        />
      </FormField>
    </div>
  );
};
// pass error message
