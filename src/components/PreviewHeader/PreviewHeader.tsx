import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import LinksIcon from "@/assets/svgr/links.svg?react";
import { Button } from "@/components/ui/Button";

import previewHeaderClasses from "./PreviewHeader.module.scss";

export const PreviewHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className={previewHeaderClasses["preview-header"]}>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => navigate("/links")}
          className={previewHeaderClasses["preview-header__btn--mobile"]}
        >
          Back to Editor
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          className={previewHeaderClasses["preview-header__btn--mobile"]}
          onClick={async () => {
            await navigator.clipboard.writeText(window.location.href);
            //TODO: change text to the href of profile/id page once it's added
            toast.success("The link has been copied to your clipboard!", {
              icon: <LinksIcon color="#737373" aria-hidden="true" />,
            });
          }}
        >
          Share Link
        </Button>
      </header>
    </>
  );
};
