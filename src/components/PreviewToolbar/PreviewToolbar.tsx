import { useNavigate } from "react-router";
import { Slide, toast, ToastContainer } from "react-toastify";

import LinksIcon from "@/assets/svgr/links.svg?react";
import { Button } from "@/components/ui/Button";

import previewToolbarClasses from "./PreviewToolbar.module.scss";

export const PreviewToolbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        role="toolbar"
        className={previewToolbarClasses["toolbar"]}
        aria-label="Preview Toolbar"
      >
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => navigate("/links")}
          className={previewToolbarClasses["btn--mobile"]}
        >
          Back to Editor
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          className={previewToolbarClasses["btn--mobile"]}
          onClick={async () => {
            await navigator.clipboard.writeText(window.location.href);
            //TODO: change text to the href of profile/id page once it's added
            toast.success("The link has been copied to your clipboard!");
          }}
        >
          Share Link
        </Button>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        role="status"
        closeOnClick={false}
        rtl={false}
        closeButton={false}
        icon={<LinksIcon color="#737373" aria-hidden="true" />}
        transition={Slide}
        theme="dark"
        toastClassName={previewToolbarClasses["toast"]}
      />
    </>
  );
};
