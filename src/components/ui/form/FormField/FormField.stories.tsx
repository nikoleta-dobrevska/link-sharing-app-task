import { type Meta, type StoryObj } from "@storybook/react-vite";

import ExampleIcon from "@/assets/svgr/Person.svg?react";
import { Input } from "@/components/ui/form/Input";
import { Invalid, Valid } from "@/components/ui/form/Input/Input.stories";

import { FormField } from "./FormField";

const meta = {
  title: "ui/form/FormField",
  component: FormField,
  parameters: { layout: "centered" },
  argTypes: {
    errorMessage: {
      control: "text",
      description: "Error message for the input field",
    },
    children: {
      control: false,
      description: "The input field",
    },
    icon: {
      control: false,
      description: "Icon for the input field",
    },
  },
  args: {
    icon: <ExampleIcon />,
    children: <Input {...Valid.args} />,
  },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    errorMessage: "Error message",
    children: <Input {...Invalid.args} />,
  },
};
