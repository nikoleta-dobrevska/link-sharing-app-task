import { clsx } from "clsx";
import { useRef, useState } from "react";

import ImageIcon from "@/assets/svgr/Image.svg?react";
import { Typography } from "@/components/typography";

import imageUploaderClasses from "./ImageUploader.module.scss";

type ImageUploaderProps = {
  errorMessage: string | undefined;
};

export const ImageUploader = ({ errorMessage }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <button
        className={clsx(
          imageUploaderClasses["img-uploader"],
          preview && imageUploaderClasses["img-uploader--has-preview"]
        )}
        onClick={() => inputRef?.current?.click()}
      >
        <input
          ref={inputRef}
          className={imageUploaderClasses["img-uploader__file"]}
          onChange={handleImagePreview}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          aria-required="true"
          aria-invalid={!!errorMessage}
        />
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
    </>
  );
};
