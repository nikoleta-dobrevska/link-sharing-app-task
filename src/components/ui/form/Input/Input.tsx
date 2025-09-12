import { clsx } from "clsx";

import inputClasses from "./Input.module.scss";

type InputProps = React.ComponentProps<"input">;

export const Input = ({ className, ...inputProps }: InputProps) => {
  return (
    <input
      {...inputProps}
      className={clsx(inputClasses["form__input"], className)}
    />
  );
};
