import { Slide, ToastContainer } from "react-toastify";

import customToastComponentClasses from "./CustomToastComponent.module.scss";

export const CustomToastComponent = () => {
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
      transition={Slide}
      theme="dark"
      toastClassName={customToastComponentClasses["toast"]}
    />
  );
};
