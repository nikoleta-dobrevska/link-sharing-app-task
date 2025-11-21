import { type Meta, type StoryObj } from "@storybook/react-vite";

import { Label } from "./Label";

const meta = {
  title: "ui/form/Label",
  component: Label,
  parameters: { layout: "centered" },
  argTypes: {
    color: {
      control: "select",
      description: "Color of the label",
      options: ["gray", "dark-gray"],
      table: {
        type: { summary: '"gray" | "dark-gray"' },
      },
    },
    htmlFor: {
      control: "text",
      description: "The html-for attribute for a form label",
    },
    className: {
      control: "text",
      description: "Additional classname for the component",
    },
  },
  args: {
    htmlFor: "htmlFor",
    color: "gray",
    children: "Label",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Gray: Story = {};

export const DarkGray: Story = {
  args: { color: "dark-gray" },
};
