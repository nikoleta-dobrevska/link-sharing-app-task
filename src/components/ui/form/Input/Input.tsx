import { clsx } from "clsx";

import inputClasses from "./Input.module.scss";

type InputProps = {
  invalid: boolean;
} & React.ComponentProps<"input">;

export const Input = ({ invalid, className, ...inputProps }: InputProps) => {
  return (
    <input
      {...inputProps}
      className={clsx(
        inputClasses["form__input"],
        invalid && inputClasses["form__input--invalid"],
        className
      )}
    />
  );
};
