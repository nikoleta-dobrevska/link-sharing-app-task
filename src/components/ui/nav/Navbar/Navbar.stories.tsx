import { type Meta, type StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";

import { Navbar } from "./Navbar";

const RoutingContextDecorator = (Element: React.ComponentType) => (
  <MemoryRouter initialEntries={["/links"]}>
    <Element />
  </MemoryRouter>
);

const meta = {
  title: "ui/nav/Navbar",
  component: Navbar,
  decorators: [RoutingContextDecorator],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "1.5rem",
          padding: "1.5rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Tablet: Story = {
  globals: {
    viewport: { value: "tablet", isRotated: false },
  },
};

export const Mobile: Story = {
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
};
