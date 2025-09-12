import { clsx } from "clsx";
import { Fragment, useEffect, useId, useRef, useState } from "react";

import DownIcon from "@/assets/svgr/Down.svg?react";
import UpIcon from "@/assets/svgr/Up.svg?react";
import { Typography } from "@/components/typography";

import dropDownFieldClasses from "./DropDownField.module.scss";

type ArrowProps = {
  isDropdownOpen: boolean;
};

const Arrow = ({ isDropdownOpen }: ArrowProps) => {
  return isDropdownOpen ? <UpIcon /> : <DownIcon />;
};

type Option = {
  icon: React.ReactNode;
  value: string;
  name: string;
};

type DropDownFieldProps = {
  placeholder: React.ReactNode;
  options: Option[];
};

export const DropDownField = ({ placeholder, options }: DropDownFieldProps) => {
  const id = useId();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState<Option | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const comboboxRef = useRef<HTMLDivElement>(null);
  const dropDownFieldRef = useRef<HTMLDivElement>(null);

  const onOptionClick = (option: Option, i: number) => {
    setCurrentOption(option);
    setActiveIndex(i);
    setDropdownOpen(false);
  };

  const focus = () => {
    comboboxRef?.current?.focus();
  };

  useEffect(() => {
    const handleClickOutsideDropDownField = (e: MouseEvent | TouchEvent) => {
      if (
        dropDownFieldRef.current &&
        !dropDownFieldRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("mouseup", handleClickOutsideDropDownField);
    window.addEventListener("touchend", handleClickOutsideDropDownField);

    return () => {
      window.removeEventListener("mouseup", handleClickOutsideDropDownField);
      window.addEventListener("touchend", handleClickOutsideDropDownField);
    };
  }, [dropDownFieldRef]);

  const handleKeyDownCombobox = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isDropdownOpen) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setDropdownOpen(true);
      focus();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setDropdownOpen(true);
      setActiveIndex(0);
      focus();
      return;
    }

    if (
      e.key === "Enter" ||
      e.key === " " ||
      (e.altKey && e.key === "ArrowDown")
    ) {
      e.preventDefault();
      setDropdownOpen(true);
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      setDropdownOpen(true);
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(options.length - 1);
      setDropdownOpen(true);
      return;
    }
  };

  const handleKeyDownListbox = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isDropdownOpen) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setCurrentOption(options[activeIndex]);
        setDropdownOpen(false);
        focus();
        return;
      }

      if (e.key === "Escape") {
        setDropdownOpen(false);
        focus();
        return;
      }

      if (e.key === "Tab") {
        setCurrentOption(options[activeIndex]);
        setDropdownOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (activeIndex !== options.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
        return;
      }

      if (e.altKey && e.key === "ArrowUp") {
        setCurrentOption(options[activeIndex]);
        setDropdownOpen(false);
        focus();
        return;
      }

      if (e.key === "Home") {
        e.preventDefault();
        setActiveIndex(0);
        return;
      }

      if (e.key === "End") {
        e.preventDefault();
        setActiveIndex(options.length - 1);
        return;
      }

      if (e.key === "PageDown") {
        if (options.length >= 10) {
          setActiveIndex(9);
        } else {
          setActiveIndex(options.length - 1);
        }
      }

      if (e.key === "PageUp") {
        if (options.length >= 10) {
          setActiveIndex(0);
        } else {
          setActiveIndex(9);
        }
      }
    }
  };

  return (
    <div
      className={dropDownFieldClasses["drop-down-field"]}
      ref={dropDownFieldRef}
    >
      <div
        className={dropDownFieldClasses["drop-down-field__display-container"]}
        onClick={() => {
          setDropdownOpen(!isDropdownOpen);
        }}
        onKeyDown={handleKeyDownCombobox}
        role="combobox"
        ref={comboboxRef}
        aria-autocomplete="none"
        aria-expanded={isDropdownOpen}
        aria-controls={isDropdownOpen ? id + "-optionsContainer" : undefined}
        aria-labelledby={id + "-currentOption"}
        aria-activedescendant={id + `-option${activeIndex}`}
        tabIndex={isDropdownOpen ? -1 : 0}
      >
        <div
          className={
            dropDownFieldClasses["drop-down-field__display-container__tools"]
          }
        >
          <span style={{ color: "#737373" }} aria-hidden={true}>
            {currentOption?.icon ?? ""}
          </span>
          <Typography
            component="span"
            id={id + "-currentOption"}
            aria-live="polite"
            variant="body"
            size="md"
          >
            {currentOption?.name ?? placeholder}
          </Typography>
        </div>
        <Arrow isDropdownOpen={isDropdownOpen} />
      </div>

      {isDropdownOpen && (
        <div
          id={id + "-optionsContainer"}
          className={dropDownFieldClasses["drop-down-field__options"]}
          role="listbox"
          tabIndex={isDropdownOpen ? 0 : -1}
          onKeyDown={handleKeyDownListbox}
          aria-labelledby={id + "-currentOption"}
          aria-multiselectable={false}
        >
          {options.map((option, i) => {
            const isCurrentOption = option.value === currentOption?.value;

            return (
              <Fragment key={option.value}>
                <div
                  role="option"
                  tabIndex={isDropdownOpen ? 0 : -1}
                  onKeyDown={() => {}}
                  aria-selected={i === activeIndex}
                  aria-labelledby={id + `-option${i}`}
                  className={clsx(
                    dropDownFieldClasses["drop-down-field__options__option"],
                    isCurrentOption &&
                      dropDownFieldClasses[
                        "drop-down-field__options__option--current"
                      ]
                  )}
                  onClick={() => onOptionClick(option, i)}
                >
                  <span aria-hidden={true}>{option.icon}</span>
                  <Typography
                    component="li"
                    id={id + `-option${i}`}
                    variant="body"
                    size="md"
                  >
                    {option.name}
                  </Typography>
                </div>
                <span
                  className={
                    dropDownFieldClasses[
                      "drop-down-field__options__option__separator"
                    ]
                  }
                  aria-hidden={true}
                />
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};
