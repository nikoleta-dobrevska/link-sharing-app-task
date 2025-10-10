import { clsx } from "clsx";
import { useRef } from "react";

import ImageIcon from "@/assets/svgr/Image.svg?react";
import { Typography } from "@/components/typography";

import imageUploaderClasses from "./ImageUploader.module.scss";

type ImageUploaderProps = {
  id: string;
  ariaDescribedBy: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage: string | undefined;
  preview: string | null;
  onRemovePreview: () => void;
  hideDeleteButton: boolean;
  hideRemovePreviewButton: boolean;
  onDeleteProfilePicture: () => void;
};

export const ImageUploader = ({
  id,
  ariaDescribedBy,
  errorMessage,
  onChange,
  preview,
  onRemovePreview,
  hideDeleteButton,
  hideRemovePreviewButton,
  onDeleteProfilePicture,
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={imageUploaderClasses["img-uploader-container"]}>
      <input
        id={id}
        ref={inputRef}
        aria-describedby={ariaDescribedBy}
        className={imageUploaderClasses["img-uploader__file"]}
        onChange={onChange}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        aria-required="false"
        aria-invalid={!!errorMessage}
      />
      <button
        className={clsx(
          imageUploaderClasses["img-uploader"],
          preview && imageUploaderClasses["img-uploader--has-preview"]
        )}
        onClick={() => inputRef?.current?.click()}
        type="button"
      >
        {preview && (
          <img
            src={preview}
            alt=""
            className={imageUploaderClasses["preview"]}
          />
        )}
        <ImageIcon
          aria-hidden="true"
          className={imageUploaderClasses["img-uploader__svg"]}
        />
        <div className={imageUploaderClasses["img-uploader__text"]}>
          {!preview && <span aria-hidden="true">+</span>}
          <Typography component="span" variant="heading" size="sm">
            {preview ? "Change Image" : "Upload Image"}
          </Typography>
        </div>
      </button>
      <p className={imageUploaderClasses["error-msg"]} role="alert">
        {errorMessage}
      </p>
      {!hideRemovePreviewButton && (
        <button
          onClick={onRemovePreview}
          className={imageUploaderClasses["remove-btn"]}
          type="button"
        >
          Remove Preview
        </button>
      )}
      {!hideDeleteButton && (
        <button
          onClick={onDeleteProfilePicture}
          className={imageUploaderClasses["delete-btn"]}
          type="button"
        >
          Delete Picture
        </button>
      )}
    </div>
  );
};
