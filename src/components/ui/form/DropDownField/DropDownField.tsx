import { clsx } from "clsx";
import { Fragment, useState } from "react";

import DownIcon from "@/assets/svgr/Down.svg?react";
import UpIcon from "@/assets/svgr/Up.svg?react";
import { Typography } from "@/components/typography";

import dropDownFieldClasses from "./DropDownField.module.scss";

type Arrow = {
  isOpen: boolean;
};

const Arrow = ({ isOpen }: Arrow) => {
  return isOpen ? <UpIcon /> : <DownIcon />;
};

type Option = {
  icon: React.ReactNode;
  value: string;
  name: string;
};

type OptionsArray = Option[];

type DropDownField = {
  placeholder: React.ReactNode;
  options: OptionsArray;
};

export const DropDownField = ({ placeholder, options }: DropDownField) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>({
    icon: "",
    value: "",
    name: "",
  });

  const getSelectedOptionName = () => {
    if (
      !selectedOption ||
      (selectedOption.icon === "" &&
        selectedOption.name === "" &&
        selectedOption.value === "")
    ) {
      return placeholder;
    }

    return selectedOption.name;
  };

  const onOptionClick = (option: Option) => {
    setSelectedOption(option);
    setShowOptions(false);
    setIsOpen(false);
  };

  const isSelected = (option: string) => {
    return selectedOption.value !== option ? false : true;
  };

  return (
    <div className={dropDownFieldClasses["drop-down-field"]}>
      <button
        className={dropDownFieldClasses["drop-down-field__display-container"]}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowOptions(!showOptions);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="options-container"
        aria-labelledby="currentlySelectedOption"
      >
        <div
          className={
            dropDownFieldClasses["drop-down-field__display-container__tools"]
          }
        >
          <span style={{ color: "#737373" }} aria-hidden={true}>
            {selectedOption.icon || ""}
          </span>
          <Typography
            component="span"
            id="currentlySelectedOption"
            aria-live="polite"
            variant="body"
            size="md"
            children={getSelectedOptionName()}
          />
        </div>
        <Arrow isOpen={isOpen} />
      </button>

      {showOptions && (
        <div
          id="options-container"
          className={dropDownFieldClasses["drop-down-field__options"]}
          aria-roledescription="listbox"
          aria-multiselectable={false}
        >
          {options.map((option) => (
            <Fragment key={option.value}>
              <button
                aria-roledescription="option"
                aria-labelledby="option"
                className={clsx(
                  dropDownFieldClasses["drop-down-field__options__option"],
                  isSelected(option.value) &&
                    dropDownFieldClasses[
                      "drop-down-field__options__option--selected"
                    ]
                )}
                onClick={() => onOptionClick(option)}
              >
                <span aria-hidden={true}>{option.icon}</span>
                <Typography
                  component="span"
                  id="option"
                  variant="body"
                  size="md"
                  aria-selected={isSelected(option.value) ? true : false}
                  children={option.name}
                />
              </button>
              <span
                className={
                  dropDownFieldClasses[
                    "drop-down-field__options__option__separator"
                  ]
                }
                aria-hidden={true}
              />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
