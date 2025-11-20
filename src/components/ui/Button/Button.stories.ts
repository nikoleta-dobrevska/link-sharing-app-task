import { type Meta, type StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";

const meta = {
  title: "ui/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: ["md"],
      description: "Size of the button",
      table: {
        type: { summary: '"md"' },
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "Variant of the button",
      table: {
        type: { summary: '"primary" | "secondary"' },
        defaultValue: { summary: "primary" },
      },
    },
  },
  args: { children: "Button" },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "md",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    size: "md",
    variant: "secondary",
  },
};
