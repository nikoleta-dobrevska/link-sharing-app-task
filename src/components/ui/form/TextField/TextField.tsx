import textFieldClasses from "./TextField.module.scss";

interface TextFieldProps {
  children: React.ReactNode;
}

export const TextField = ({ children }: TextFieldProps) => {
  return <input className={textFieldClasses["text-field"]}>{children}</input>;
};
