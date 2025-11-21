import { type Meta, type StoryObj } from "@storybook/react-vite";

import { Input } from "./Input";

const meta = {
  title: "ui/form/Input",
  component: Input,
  parameters: { layout: "centered" },
  argTypes: {
    invalid: {
      control: "boolean",
      description: "Is the input completed in a valid or invalid way",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    value: "",
    placeholder: "Enter value",
    invalid: false,
  },
};

export const Valid: Story = {
  args: {
    value: "Valid",
    invalid: false,
  },
};

export const Invalid: Story = {
  args: {
    value: "Invalid",
    invalid: true,
  },
};
