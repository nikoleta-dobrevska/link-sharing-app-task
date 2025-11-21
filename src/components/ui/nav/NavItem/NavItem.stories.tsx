import { type Meta, type StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import { NavItem } from "./NavItem";

const RoutingContextDecorator = (Element: React.ComponentType) => (
  <MemoryRouter initialEntries={["/active"]}>
    <Element />
  </MemoryRouter>
);

const meta = {
  title: "ui/nav/NavItem",
  component: NavItem,
  decorators: [RoutingContextDecorator],
  parameters: { layout: "centered" },
  argTypes: {
    to: {
      control: "text",
      description: "The href attribute of the navlink element",
    },
  },
  args: {
    children: "Nav Item",
    to: "/inactive",
  },
} satisfies Meta<typeof NavItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inactive: Story = {};

export const Active: Story = {
  args: {
    to: "/active",
  },
};
