import { NavLink } from "react-router";

import { Typography } from "@/components/typography";

import errorPageClasses from "./ErrorPage.module.scss";

export const ErrorPage = () => {
  return (
    <div className={errorPageClasses["error-page"]}>
      <Typography
        component="p"
        variant="body"
        size="md"
        role="alert"
        className={errorPageClasses["error-page__msg"]}
      >
        You are not authorized to see this page or another problem occured.
        Please log in and try again.
        <NavLink
          to="/"
          end
          className={errorPageClasses["error-page__msg__link"]}
        >
          Login
        </NavLink>
      </Typography>
    </div>
  );
};
