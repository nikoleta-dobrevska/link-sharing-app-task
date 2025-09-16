import EmailIcon from "@/assets/svgr/Email.svg?react";
import PasswordIcon from "@/assets/svgr/Password.svg?react";
import PersonIcon from "@/assets/svgr/Person.svg?react";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";

import registerClasses from "./Register.module.scss";

export const Register = () => {
  return (
    <div className={registerClasses["register"]}>
      <div className={registerClasses["register__heading"]}>
        <Typography
          component="h1"
          variant="heading"
          size="md"
          className={registerClasses["register__heading__h1"]}
        >
          Create account
        </Typography>
        <Typography
          component="span"
          variant="body"
          size="md"
          className={registerClasses["register__heading__desc"]}
        >
          Let’s get you started sharing your links!
        </Typography>
      </div>
      <div className={registerClasses["register__form"]}>
        <div className={registerClasses["register__form__field"]}>
          <Label color="dark-gray" htmlFor="">
            First Name
          </Label>
          <FormField icon={<PersonIcon />} errorMessage="">
            <Input type="text" placeholder="e.g. Ben" />
          </FormField>
        </div>
        <div className={registerClasses["register__form__field"]}>
          <Label color="dark-gray" htmlFor="">
            Last Name
          </Label>
          <FormField icon={<PersonIcon />} errorMessage="">
            <Input type="text" placeholder="e.g. Wright" />
          </FormField>
        </div>
        <div className={registerClasses["register__form__field"]}>
          <Label color="dark-gray" htmlFor="email">
            Email address
          </Label>
          <FormField icon={<EmailIcon />} errorMessage="">
            <Input type="email" placeholder="e.g. alex@email.com" />
          </FormField>
        </div>
        <div className={registerClasses["register__form__field"]}>
          <Label color="dark-gray" htmlFor="password">
            Create password
          </Label>
          <FormField icon={<PasswordIcon />} errorMessage="">
            <Input type="password" placeholder="At least 8 characters" />
          </FormField>
        </div>
        <div className={registerClasses["register__form__field"]}>
          <Label color="dark-gray" htmlFor="confirm-password">
            Confirm password
          </Label>
          <FormField icon={<PasswordIcon />} errorMessage="">
            <Input type="password" placeholder="At least 8 characters" />
          </FormField>
        </div>
        <Typography
          component="p"
          variant="body"
          size="sm"
          className={registerClasses["register__form__pass-desc"]}
        >
          Password must contain at least 8 characters
        </Typography>
        <Button variant="primary" size="md" type="submit">
          Create new account
        </Button>
      </div>
      <Typography
        component="p"
        variant="body"
        size="md"
        className={registerClasses["register__login-prompt"]}
      >
        Already have an account?
        <a
          className={registerClasses["register__login-prompt__link"]}
          href="/login"
        >
          Login
        </a>
      </Typography>
    </div>
  );
};
