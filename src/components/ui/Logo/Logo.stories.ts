import { type Meta, type StoryObj } from "@storybook/react-vite";

import { Logo } from "./Logo";

const meta = {
  title: "ui/Logo",
  component: Logo,
  parameters: { layout: "centered" },
  argTypes: {
    className: {
      control: "text",
      description: "Additional classname for the component",
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
