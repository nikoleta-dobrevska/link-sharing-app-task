import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import LinksIcon from "@/assets/svgr/links.svg?react";
import { Button } from "@/components/ui/Button";

import previewHeaderClasses from "./PreviewHeader.module.scss";

type PreviewHeaderProps = {
  userId?: number;
};

export const PreviewHeader = ({ userId }: PreviewHeaderProps) => {
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
            try {
              await navigator.clipboard.writeText(
                `${import.meta.env.VITE_FRONTEND_URL}/profile/${userId}`
              );

              toast.success("The link has been copied to your clipboard!", {
                icon: <LinksIcon color="#737373" aria-hidden="true" />,
              });
            } catch (error) {
              toast.error(`An error occured: ${error}. Please try again.`);
            }
          }}
        >
          Share Link
        </Button>
      </header>
    </>
  );
};
