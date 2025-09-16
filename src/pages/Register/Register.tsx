import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import EmailIcon from "@/assets/svgr/Email.svg?react";
import PasswordIcon from "@/assets/svgr/Password.svg?react";
import PersonIcon from "@/assets/svgr/Person.svg?react";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { registerUser } from "@/services/registerUser";
import { type RegisterFormData, registerSchema } from "@/types";

import registerClasses from "./Register.module.scss";

export const Register = () => {
  const passwordNote = useId();
  const [globalErrorMsg, setGlobalErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async () => {
      navigate("/login");
    },
    onError: async (error) => {
      setGlobalErrorMsg(
        error?.message ?? "Oops, something went wrong! Please try again later."
      );
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    mutation.mutateAsync(data);
  };

  return (
    <div className={registerClasses["register"]}>
      {mutation.isError && (
        <Typography
          component="span"
          role="alert"
          variant="body"
          size="md"
          className={registerClasses["register__global-error-msg"]}
        >
          {globalErrorMsg}
        </Typography>
      )}
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={registerClasses["register__form"]}
      >
        <div className={registerClasses["register__form__field"]}>
          <Label color="dark-gray" htmlFor="firstName">
            First Name
          </Label>
          <FormField
            icon={<PersonIcon />}
            errorMessage={errors?.firstName?.message}
          >
            <Input
              id="firstName"
              {...register("firstName")}
              aria-invalid={!!errors?.firstName}
              autoComplete="given-name"
              type="text"
              placeholder="e.g. Ben"
              aria-required="true"
            />
          </FormField>
        </div>
        <div className={registerClasses["register__form__field"]}>
          <Label color="dark-gray" htmlFor="lastName">
            Last Name
          </Label>
          <FormField
            icon={<PersonIcon />}
            errorMessage={errors?.lastName?.message}
          >
            <Input
              id="lastName"
              {...register("lastName")}
              aria-invalid={!!errors?.lastName}
              autoComplete="family-name"
              type="text"
              placeholder="e.g. Wright"
              aria-required="true"
            />
          </FormField>
        </div>
        <div className={registerClasses["register__form__field"]}>
          <Label color="dark-gray" htmlFor="email">
            Email address
          </Label>
          <FormField icon={<EmailIcon />} errorMessage={errors?.email?.message}>
            <Input
              id="email"
              {...register("email")}
              aria-invalid={!!errors?.email}
              autoComplete="on"
              type="email"
              placeholder="e.g. alex@email.com"
              aria-required="true"
            />
          </FormField>
        </div>
        <div className={registerClasses["register__form__field"]}>
          <Label color="dark-gray" htmlFor="password">
            Create password
          </Label>
          <FormField
            icon={<PasswordIcon />}
            errorMessage={errors?.password?.message}
          >
            <Input
              id="password"
              {...register("password")}
              aria-invalid={!!errors?.password}
              aria-describedby={passwordNote}
              type="password"
              placeholder="At least 8 characters"
              aria-required="true"
            />
          </FormField>
        </div>
        <div className={registerClasses["register__form__field"]}>
          <Label color="dark-gray" htmlFor="confirmPassword">
            Confirm password
          </Label>
          <FormField
            icon={<PasswordIcon />}
            errorMessage={errors?.confirmPassword?.message}
          >
            <Input
              id="confirmPassword"
              {...register("confirmPassword")}
              aria-invalid={!!errors?.confirmPassword}
              type="password"
              placeholder="At least 8 characters"
              aria-required="true"
            />
          </FormField>
        </div>
        <Typography
          component="p"
          variant="body"
          size="sm"
          className={registerClasses["register__form__pass-desc"]}
          id={passwordNote}
        >
          Password must contain at least 8 characters
        </Typography>
        <Button variant="primary" size="md" type="submit">
          Create new account
        </Button>
      </form>
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
