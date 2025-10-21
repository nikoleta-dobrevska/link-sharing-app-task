import { clsx } from "clsx";
import React, { Fragment, useEffect, useId, useRef, useState } from "react";

import DownIcon from "@/assets/svgr/Down.svg?react";
import UpIcon from "@/assets/svgr/Up.svg?react";
import { Typography } from "@/components/typography";
import { KeyboardEventKey } from "@/constants";
import { type Option } from "@/types";

import dropDownFieldClasses from "./DropDownField.module.scss";

type ArrowProps = {
  isDropdownOpen: boolean;
};

const Arrow = ({ isDropdownOpen }: ArrowProps) => {
  return isDropdownOpen ? <UpIcon /> : <DownIcon />;
};

type DropDownFieldProps = {
  dropDownFieldId: string;
  placeholder: React.ReactNode;
  onChange: (option: Option) => void;
  options: Option[];
  selected?: Option | null;
};

export const DropDownField = ({
  dropDownFieldId,
  placeholder,
  onChange,
  options,
  selected,
}: DropDownFieldProps) => {
  const id = useId();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [visualFocusIndex, setVisualFocusIndex] = useState(() =>
    selected ? options.findIndex((option) => option === selected) : 0
  );

  const comboboxRef = useRef<HTMLDivElement>(null);
  const dropDownFieldRef = useRef<HTMLDivElement>(null);

  const onOptionClick = (option: Option, i: number) => {
    setVisualFocusIndex(i);
    setDropdownOpen(false);
    onChange(option);
  };

  const focusCombobox = () => {
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
    if (e.key === KeyboardEventKey.arrowDown) {
      e.preventDefault();

      if (isDropdownOpen) {
        if (visualFocusIndex !== options.length - 1) {
          setVisualFocusIndex(visualFocusIndex + 1);
        }
        return;
      } else {
        setDropdownOpen(true);
        focusCombobox();
        return;
      }
    }

    if (e.key === KeyboardEventKey.arrowUp) {
      e.preventDefault();

      if (isDropdownOpen) {
        if (visualFocusIndex > 0) {
          setVisualFocusIndex(visualFocusIndex - 1);
        }
        return;
      } else {
        setDropdownOpen(true);
        setVisualFocusIndex(0);
        focusCombobox();
        return;
      }
    }

    if (
      e.key === KeyboardEventKey.enter ||
      e.key === KeyboardEventKey.space ||
      (e.altKey && e.key === KeyboardEventKey.arrowDown)
    ) {
      e.preventDefault();

      if (isDropdownOpen) {
        onChange(options[visualFocusIndex]);
        setDropdownOpen(false);
        focusCombobox();
        return;
      } else {
        setDropdownOpen(true);
        return;
      }
    }

    if (e.key === KeyboardEventKey.home) {
      e.preventDefault();
      setVisualFocusIndex(0);

      if (!isDropdownOpen) {
        setDropdownOpen(true);
        return;
      }
      return;
    }

    if (e.key === KeyboardEventKey.end) {
      setVisualFocusIndex(options.length - 1);

      if (!isDropdownOpen) {
        setDropdownOpen(true);
        return;
      }
      return;
    }

    if (isDropdownOpen) {
      if (e.key === KeyboardEventKey.tab) {
        onChange(options[visualFocusIndex]);
        setDropdownOpen(false);
        return;
      }

      if (e.key === KeyboardEventKey.escape) {
        setDropdownOpen(false);
        focusCombobox();
        return;
      }

      if (e.altKey && e.key === KeyboardEventKey.arrowUp) {
        onChange(options[visualFocusIndex]);
        setDropdownOpen(false);
        focusCombobox();
        return;
      }

      if (e.key === KeyboardEventKey.pageUp) {
        if (options.length >= 10) {
          setVisualFocusIndex(0);
        } else {
          setVisualFocusIndex(9);
        }
      }

      if (e.key === KeyboardEventKey.pageDown) {
        if (options.length >= 10) {
          setVisualFocusIndex(9);
        } else {
          setVisualFocusIndex(options.length - 1);
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
        id={id + `-${dropDownFieldId}`}
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
        aria-activedescendant={id + `-option${visualFocusIndex}`}
        tabIndex={0}
      >
        <div
          className={
            dropDownFieldClasses["drop-down-field__display-container__tools"]
          }
        >
          <img aria-hidden="true" alt="" src={selected?.src} />
          <Typography
            component="span"
            id={id + "-currentOption"}
            aria-live="polite"
            variant="body"
            size="md"
          >
            {selected?.name ?? placeholder}
          </Typography>
        </div>
        <Arrow isDropdownOpen={isDropdownOpen} />
      </div>

      {isDropdownOpen && (
        <div
          id={id + "-optionsContainer"}
          className={dropDownFieldClasses["drop-down-field__options"]}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={id + "-currentOption"}
          aria-multiselectable={false}
        >
          {options.map((option, i) => {
            const isCurrentOption = option.name === selected?.name;

            return (
              <Fragment key={option.name}>
                {/*eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus*/}
                <div
                  role="option"
                  aria-selected={i === visualFocusIndex}
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
                  <img
                    aria-hidden="true"
                    alt=""
                    src={option?.src}
                    className={
                      dropDownFieldClasses[
                        "drop-down-field__options__option__icon"
                      ]
                    }
                  />
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
