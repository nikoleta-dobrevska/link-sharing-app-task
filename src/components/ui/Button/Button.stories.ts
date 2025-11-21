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
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "Variant of the button",
      table: {
        type: { summary: '"primary" | "secondary"' },
      },
    },
  },
  args: { children: "Button" },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
  },
};

export const DisabledPrimary: Story = {
  args: {
    disabled: true,
    variant: "primary",
    size: "md",
  },
};

export const DisabledSecondary: Story = {
  args: {
    disabled: true,
    variant: "secondary",
    size: "md",
  },
};
