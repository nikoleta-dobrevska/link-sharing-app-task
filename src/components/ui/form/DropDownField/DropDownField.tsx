import dropDownFieldClasses from "./DropDownField.module.scss";

type DropDownFieldData = {
  icon: React.ReactNode;
  value: string;
  name: string;
  isDisabled: boolean;
};

type DataArray = DropDownFieldData[];

type OptionProps = {} & React.ComponentPropsWithRef<"option">;

type SelectProps = {
  data: DataArray;
} & React.ComponentPropsWithRef<"select">;

const Option = ({ children, ...optionProps }: OptionProps) => {
  return <option {...optionProps}>{children}</option>;
};

export const DropDownField = ({ data, ...selectProps }: SelectProps) => {
  return (
    <select
      {...selectProps}
      className={dropDownFieldClasses["form__drop-down-field"]}
    >
      {data.map((d) => (
        <Option
          key={d.value}
          value={d.value}
          disabled={d.isDisabled}
          className={dropDownFieldClasses["form__drop-down-field__option"]}
        >
          {d.icon}
          {d.name}
        </Option>
      ))}
    </select>
  );
};
