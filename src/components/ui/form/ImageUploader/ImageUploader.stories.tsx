import { type Meta, type StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { expect } from "storybook/test";

import testImage from "@/assets/test-images/f406612e3820ced4aec053cac74a5bc768f6929d.jpg";
import { ImageUploader } from "@/components/ui/form/ImageUploader";

const meta = {
  title: "ui/form/ImageUploader",
  component: ImageUploader,
  parameters: { layout: "centered" },
  argTypes: {
    id: {
      control: "text",
      description: "The id attribute of the image uploader component",
    },
    ariaDescribedBy: {
      control: "text",
      description:
        "The id of the component who is used for describing the image uploader component",
    },
    ariaRequired: {
      control: "boolean",
      description: "Whether the image is required in a form or not",
    },
    name: {
      control: "text",
      description: "The name attribute of the image uploader component",
    },
    onChange: {
      control: false,
      description:
        "What should happen on the onchange event of the image uploader component",
    },
    errorMessage: {
      control: "text",
      description:
        "The error message should an error occur with the image uploader component",
    },
    preview: {
      control: false,
      description: "Preview of the uploaded image",
    },
  },
  args: {
    id: "id",
    ariaDescribedBy: "descriptor",
    ariaRequired: false,
    name: "image",
    onChange: action("on-change"),
    preview: undefined,
  },
} satisfies Meta<typeof ImageUploader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Uploaded: Story = {
  args: {
    preview: testImage,
  },
  play: async ({ canvas, userEvent }) => {
    const file = new File([testImage], "mockfile.jpg", { type: "image/jpg" });

    const imageUploader = canvas.getByDisplayValue("");

    await userEvent.upload(imageUploader, file);

    await expect(canvas.getByText("Change Image")).toBeInTheDocument();
    await expect(imageUploader).toHaveValue("C:\\fakepath\\mockfile.jpg");
  },
};

export const Error: Story = {
  args: {
    errorMessage: "Error message",
  },
};
