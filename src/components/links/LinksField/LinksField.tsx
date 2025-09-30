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
import StripesIcon from "@/assets/svgr/Stripes.svg?react";
import { LinkProviderDropDownField } from "@/components/links/LinkProviderDropDownField";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { type LinkProviderData, type LinksFormData } from "@/types";

import linksFieldClasses from "./LinksField.module.scss";

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
    <div className={linksFieldClasses["link-field"]}>
      <div className={linksFieldClasses["link-field__row"]}>
        <div className={linksFieldClasses["link-field__name"]}>
          <StripesIcon aria-hidden={true} />
          <span className={linksFieldClasses["link-field__name--gray"]}>
            Link #{index + 1}
          </span>
        </div>
        <button
          type="button"
          onClick={() => deleteLinkMutation.mutate(field.linkProvider.id)}
          className={linksFieldClasses["link-field__remove-btn"]}
        >
          Remove
        </button>
      </div>
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
        Link
      </Label>
      <FormField icon={<LinksIcon />} errorMessage={errorMessage}>
        <Input
          id={id + `link-${index}`}
          {...register(`links.${index}.link`)}
          aria-required="true"
          aria-invalid={!!errorMessage}
          className={clsx(
            errorMessage
              ? linksFieldClasses["link-field__input--invalid"]
              : linksFieldClasses["link-field__input--valid"]
          )}
          type="text"
          placeholder="e.g. https://www.github.com/johnappleseed"
        />
      </FormField>
    </div>
  );
};
