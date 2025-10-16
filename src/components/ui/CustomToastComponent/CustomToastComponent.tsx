import { Slide, ToastContainer, type ToastIcon } from "react-toastify";

import customToastComponentClasses from "./CustomToastComponent.module.scss";

type ToastProps = {
  icon: ToastIcon;
};

export const CustomToastComponent = ({ icon }: ToastProps) => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={4000}
      hideProgressBar={true}
      newestOnTop={true}
      role="status"
      closeOnClick={false}
      rtl={false}
      closeButton={false}
      icon={icon}
      transition={Slide}
      theme="dark"
      toastClassName={customToastComponentClasses["toast"]}
    />
  );
};
