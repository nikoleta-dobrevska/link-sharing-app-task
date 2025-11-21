import { type Meta, type StoryObj } from "@storybook/react-vite";

import { type Option } from "@/types";

import { DropDownField } from "./DropDownField";

const options: Option[] = [
  {
    name: "Option 1",
    src: "/src/assets/svgr/Person.svg",
  },
  {
    name: "Option 2",
    src: "/src/assets/svgr/Person.svg",
  },
  {
    name: "Option 3",
    src: "/src/assets/svgr/Person.svg",
  },
];

const meta = {
  title: "ui/form/DropDownField",
  component: DropDownField,
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
  argTypes: {
    dropDownFieldId: {
      control: "text",
      description: "The id attribute of the dropdown field",
    },
    placeholder: {
      control: "text",
      description: "The default value if no option is selected yet",
    },
  },
  args: {
    dropDownFieldId: "id",
    placeholder: "Dropdown Field",
    options: options,
    onChange: () => {},
  },
} satisfies Meta<typeof DropDownField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: options[2] },
};
