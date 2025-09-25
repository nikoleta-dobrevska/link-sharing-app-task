import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";

import EmailIcon from "@/assets/svgr/Email.svg?react";
import PasswordIcon from "@/assets/svgr/Password.svg?react";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Label } from "@/components/ui/form/Label";
import { RoutePaths } from "@/constants";
import { setLocalStorageItem } from "@/localStorage";
import { loginSchema } from "@/schemas";
import { loginUser } from "@/services/loginUser";
import { type LoginFormData } from "@/types";

import loginClasses from "./Login.module.scss";
import inputClasses from "@/components/ui/form/Input/Input.module.scss";

export const Login = () => {
  const id = useId();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (token) => {
      setLocalStorageItem("token", token);
      navigate(RoutePaths.links);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className={loginClasses["login"]}>
      <div className={loginClasses["login__heading"]}>
        <Typography
          component="h1"
          variant="heading"
          size="md"
          className={loginClasses["login__heading__h1"]}
        >
          Login
        </Typography>
        <Typography
          component="p"
          variant="body"
          size="md"
          className={loginClasses["login__heading__desc"]}
        >
          Add your details below to get back into the app
        </Typography>
        {loginMutation?.isError && (
          <Typography
            component="p"
            role="alert"
            variant="body"
            size="md"
            className={loginClasses["login__global-error-msg"]}
          >
            Wrong email and/or password!
          </Typography>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={loginClasses["login__form"]}
      >
        <div className={loginClasses["login__form__field-group"]}>
          <Label color="dark-gray" htmlFor={id + "-email"}>
            Email address
          </Label>
          <FormField icon={<EmailIcon />} errorMessage={errors?.email?.message}>
            <Input
              id={id + "-email"}
              {...register("email")}
              aria-invalid={!!errors?.email}
              className={
                errors?.email
                  ? inputClasses["form__input--invalid"]
                  : inputClasses["form__input--valid"]
              }
              autoComplete="on"
              type="email"
              placeholder="e.g. alex@email.com"
              aria-required="true"
            />
          </FormField>
        </div>
        <div className={loginClasses["login__form__field-group"]}>
          <Label color="dark-gray" htmlFor={id + "-password"}>
            Password
          </Label>
          <FormField
            icon={<PasswordIcon />}
            errorMessage={errors?.password?.message}
          >
            <Input
              id={id + "-password"}
              {...register("password")}
              aria-invalid={!!errors?.password}
              className={
                errors?.password
                  ? inputClasses["form__input--invalid"]
                  : inputClasses["form__input--valid"]
              }
              type="password"
              placeholder="Enter your password"
              aria-required="true"
            />
          </FormField>
        </div>
        <Button variant="primary" size="md" type="submit">
          Login
        </Button>
      </form>
      <Typography
        component="p"
        variant="body"
        size="md"
        className={loginClasses["login__register-prompt"]}
      >
        Don't have an account?
        <NavLink
          to={RoutePaths.register}
          end
          className={loginClasses["login__register-prompt__link"]}
        >
          Create account
        </NavLink>
      </Typography>
    </div>
  );
};
