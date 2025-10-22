import { clsx } from "clsx";
import { useId, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  type Control,
  Controller,
  type UseFormRegister,
} from "react-hook-form";

import LinksIcon from "@/assets/svgr/links.svg?react";
import StripesIcon from "@/assets/svgr/Stripes.svg?react";
import { LinkProviderDropDownField } from "@/components/links/LinkProviderDropDownField";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { DraggableTypes } from "@/constants";
import { type LinkProviderData, type LinksFormData } from "@/types";

import linksFieldClasses from "./LinksField.module.scss";

type LinksFieldProps = {
  index: number;
  errorMessage: string | undefined;
  control: Control<LinksFormData>;
  linkProviders: Array<LinkProviderData>;
  register: UseFormRegister<LinksFormData>;
  onRemove: () => void;
  swapLink: (dragIndex: number, hoverIndex: number) => void;
};

export const LinksField = ({
  index,
  errorMessage,
  control,
  linkProviders,
  register,
  onRemove,
  swapLink,
}: LinksFieldProps) => {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DraggableTypes.LINK,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop({
    accept: DraggableTypes.LINK,
    hover: (item: { index: number }, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref?.current?.getBoundingClientRect();

      if (!hoverBoundingRect) return;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      swapLink(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={clsx(
        linksFieldClasses["link-field"],
        isDragging && linksFieldClasses["link-field--is-dragging"],
        isOver && linksFieldClasses["link-field--is-over"]
      )}
      ref={ref}
    >
      <div className={linksFieldClasses["link-field__row"]}>
        <div className={linksFieldClasses["link-field__name"]}>
          <StripesIcon
            className={linksFieldClasses["link-drag-icon"]}
            aria-hidden={true}
          />
          <span className={linksFieldClasses["link-field__name--gray"]}>
            Link #{index + 1}
          </span>
        </div>
        <button
          type="button"
          onClick={onRemove}
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
          invalid={!!errorMessage}
          type="text"
          placeholder="e.g. https://www.github.com/johnappleseed"
        />
      </FormField>
    </div>
  );
};
