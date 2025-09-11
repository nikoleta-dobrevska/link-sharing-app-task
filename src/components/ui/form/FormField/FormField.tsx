import formFieldClasses from "./FormField.module.scss";

type FormFieldProps = {
  icon?: React.ReactNode;
  errorMessage?: string;
  children: React.ReactNode;
};

export const FormField = ({ icon, errorMessage, children }: FormFieldProps) => {
  return (
    <div className={formFieldClasses["form__field"]}>
      <div className={formFieldClasses["form__field__icon"]} aria-hidden={true}>
        {icon}
      </div>
      {children}
      <div
        className={formFieldClasses["form__field__error-message"]}
        aria-hidden={errorMessage ? false : true}
      >
        {errorMessage}
      </div>
    </div>
  );
};
