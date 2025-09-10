import clsx from "clsx";

import dropDownFieldClasses from "./DropDownField.module.scss";

type DropDownFieldData = {
  icon: React.ReactNode;
  value: string;
  name: string;
};

type DataArray = DropDownFieldData[];

type OptionProps = {} & React.ComponentProps<"option">;

type SelectProps = {
  data: DataArray;
} & React.ComponentProps<"select">;

const Option = ({ children, className, ...optionProps }: OptionProps) => {
  return (
    <option
      {...optionProps}
      className={clsx(
        dropDownFieldClasses["form__drop-down-field__option"],
        className
      )}
    >
      {children}
    </option>
  );
};

export const DropDownField = ({
  data,
  className,
  ...selectProps
}: SelectProps) => {
  return (
    <select
      {...selectProps}
      className={clsx(dropDownFieldClasses["form__drop-down-field"], className)}
    >
      {data.map((d) => (
        <Option key={d.value} value={d.value}>
          {d.icon}
          {d.name}
        </Option>
      ))}
    </select>
  );
};
