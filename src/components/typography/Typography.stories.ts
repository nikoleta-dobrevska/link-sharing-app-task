import { type Meta, type StoryObj } from "@storybook/react-vite";

import { Typography } from "./Typography";

const meta = {
  title: "components/typography",
  component: Typography,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Size of the text",
      table: {
        type: { summary: '"sm" | "md"' },
      },
    },
    variant: {
      control: "select",
      options: ["heading", "body"],
      description: "Variant of the text",
      table: {
        type: { summary: '"heading" | "body"' },
      },
    },
    component: {
      control: "select",
      options: ["span", "h1", "h2", "h3", "h4", "h5", "h6", "p"],
      description: "Component type of the text",
      table: {
        type: {
          summary: '"span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"',
        },
      },
    },
  },
  args: {
    size: "sm",
    variant: "heading",
    component: "span",
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SmallHeading: Story = {
  args: {
    children: "Small Heading",
  },
};

export const MediumHeading: Story = {
  args: {
    size: "md",
    children: "Medium Heading",
  },
};

export const SmallBody: Story = {
  args: {
    variant: "body",
    children: "Small Body",
  },
};

export const MediumBody: Story = {
  args: {
    size: "md",
    variant: "body",
    children: "Medium Body",
  },
};
