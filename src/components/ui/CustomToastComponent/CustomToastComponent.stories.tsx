import { type Meta, type StoryObj } from "@storybook/react-vite";
import { toast } from "react-toastify";

import ExampleIcon from "@/assets/svgr/FloppyDisk.svg?react";
import { Button } from "@/components/ui/Button";
import { Primary } from "@/components/ui/Button/Button.stories";

import { CustomToastComponent } from "./CustomToastComponent";

const meta = {
  title: "ui/CustomToastComponent",
  component: CustomToastComponent,
  decorators: [
    (Story) => (
      <div
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CustomToastComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: () => (
    <>
      <Button
        onClick={() =>
          toast.success("Toast success", { icon: <ExampleIcon /> })
        }
        {...Primary.args}
      >
        Call Toast
      </Button>
      <CustomToastComponent />
    </>
  ),
};

export const Error: Story = {
  render: () => (
    <>
      <Button onClick={() => toast.error("Toast error")} {...Primary.args}>
        Call Toast
      </Button>
      <CustomToastComponent />
    </>
  ),
};
