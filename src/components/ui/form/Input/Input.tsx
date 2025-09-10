import inputClasses from "./Input.module.scss";

type InputProps = React.ComponentProps<"input">;

export const Input = ({ ...inputProps }): InputProps => {
  return <input {...inputProps} className={inputClasses["form__input"]} />;
};
