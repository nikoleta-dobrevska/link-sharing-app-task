import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DropDownField } from "@/components/ui/form/DropDownField/DropDownField";
import { type Option } from "@/types";

const mockOptions: Option[] = [
  {
    name: "Option 1",
    src: "src",
  },
  {
    name: "Option 2",
    src: "src",
  },
  {
    name: "Option 3",
    src: "src",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onChange = vi.fn().mockImplementation((_option: Option): void => {});

describe("Drop Down Field", () => {
  afterEach(() => vi.resetAllMocks());
  afterAll(() => vi.clearAllMocks());

  describe("Cases without a preselected option", () => {
    beforeEach(() =>
      render(
        <DropDownField
          dropDownFieldId="test-id"
          placeholder="Drop Down Field Test"
          options={mockOptions}
          onChange={onChange}
        />
      )
    );

    it("should close itself on a click outside the drop down component", async () => {
      const dropdown = await screen.findByRole("combobox");
      await userEvent.click(dropdown);

      const options = await screen.findByRole("listbox");
      expect(options).toBeInTheDocument();
      expect(dropdown).toHaveAttribute("aria-expanded", "true");

      const body = document.body;

      await userEvent.click(body);

      expect(options).not.toBeInTheDocument();
      expect(dropdown).toHaveAttribute("aria-expanded", "false");
    });

    it("should show the placeholder text in case no option is selected yet", async () => {
      const dropdown = await screen.findByRole("combobox");
      expect(dropdown).toHaveTextContent("Drop Down Field Test");
    });

    it("should render all available options", async () => {
      const dropdown = await screen.findByRole("combobox");
      await userEvent.click(dropdown);

      const options = await screen.findAllByRole("option");
      expect(options.length).toBe(3);
      expect(options[0]).toHaveTextContent(mockOptions[0].name);
      expect(options[1]).toHaveTextContent(mockOptions[1].name);
      expect(options[2]).toHaveTextContent(mockOptions[2].name);
    });
  });

  describe("Keyboard events", () => {
    beforeEach(() =>
      render(
        <DropDownField
          dropDownFieldId="test-id"
          placeholder="Drop Down Field Test"
          selected={mockOptions[1]}
          options={mockOptions}
          onChange={onChange}
        />
      )
    );

    it("should open options menu and move one option down on key 'ArrowDown'", async () => {
      const dropdown = await screen.findByRole("combobox");
      await userEvent.keyboard("{Tab}");
      expect(dropdown).toHaveFocus();

      await userEvent.keyboard("{ArrowDown}");
      const options = await screen.findAllByRole("option");

      expect(dropdown).toHaveAttribute("aria-expanded", "true");

      await userEvent.keyboard("{ArrowDown}");

      expect(options[0]).toHaveAttribute("aria-selected", "false");
      expect(options[1]).toHaveAttribute("aria-selected", "false");
      expect(options[2]).toHaveAttribute("aria-selected", "true");
    });

    it("should open options menu and move one option up on key 'ArrowUp', always starting from the first option", async () => {
      const dropdown = await screen.findByRole("combobox");
      await userEvent.keyboard("{Tab}");
      expect(dropdown).toHaveFocus();

      await userEvent.keyboard("{ArrowUp}");
      const options = await screen.findAllByRole("option");

      expect(dropdown).toHaveAttribute("aria-expanded", "true");
      expect(options[0]).toHaveAttribute("aria-selected", "true");
      expect(options[1]).toHaveAttribute("aria-selected", "false");
    });

    it("should open the menu and choose the selected option on 'Enter'", async () => {
      const dropdown = await screen.findByRole("combobox");
      await userEvent.keyboard("{Tab}");
      expect(dropdown).toHaveFocus();

      await userEvent.keyboard("{Enter}");
      expect(dropdown).toHaveAttribute("aria-expanded", "true");

      const options = await screen.findAllByRole("option");
      await userEvent.keyboard("{ArrowDown}");

      expect(options[2]).toHaveAttribute("aria-selected", "true");
      await userEvent.keyboard("{Enter}");

      expect(dropdown).toHaveTextContent("Option 2");
    });

    it("should open the menu and choose the selected option on 'Enter'", async () => {
      const dropdown = await screen.findByRole("combobox");
      await userEvent.keyboard("{Tab}");
      expect(dropdown).toHaveFocus();

      await userEvent.keyboard("{Enter}");
      expect(dropdown).toHaveAttribute("aria-expanded", "true");

      const options = await screen.findAllByRole("option");
      await userEvent.keyboard("{ArrowDown}");

      expect(options[2]).toHaveAttribute("aria-selected", "true");
      await userEvent.keyboard("{Enter}");

      expect(dropdown).toHaveTextContent("Option 2");
    });

    it("should open the menu and choose the selected option on 'Space'", async () => {
      const dropdown = await screen.findByRole("combobox");
      await userEvent.keyboard("{Tab}");
      expect(dropdown).toHaveFocus();

      await userEvent.keyboard("{Spacebar}");
      expect(dropdown).toHaveAttribute("aria-expanded", "true");

      const options = await screen.findAllByRole("option");
      await userEvent.keyboard("{ArrowDown}");

      expect(options[2]).toHaveAttribute("aria-selected", "true");
      await userEvent.keyboard("{Spacebar}");

      expect(dropdown).toHaveTextContent("Option 2");
    });

    it("should open the menu on 'Home'", async () => {
      const dropdown = await screen.findByRole("combobox");
      expect(dropdown).toHaveAttribute("aria-expanded", "false");

      await userEvent.keyboard("{Tab}{Home}");
      expect(dropdown).toHaveAttribute("aria-expanded", "true");
      const options = await screen.findAllByRole("option");
      expect(options[0]).toHaveAttribute("aria-selected", "true");
    });

    it("should open the menu on 'End'", async () => {
      const dropdown = await screen.findByRole("combobox");
      expect(dropdown).toHaveAttribute("aria-expanded", "false");

      await userEvent.keyboard("{Tab}{End}");
      expect(dropdown).toHaveAttribute("aria-expanded", "true");
      const options = await screen.findAllByRole("option");
      expect(options[options.length - 1]).toHaveAttribute(
        "aria-selected",
        "true"
      );
    });

    it("should close the dropdown menu on 'Escape' and focus it", async () => {
      const dropdown = await screen.findByRole("combobox");
      await userEvent.click(dropdown);
      expect(dropdown).toHaveAttribute("aria-expanded", "true");

      await userEvent.keyboard("{Escape}");
      expect(dropdown).toHaveAttribute("aria-expanded", "false");
      expect(dropdown).toHaveFocus();
    });

    it("should jump the visual focus up to the first option on 'PageUp'", async () => {
      const dropdown = await screen.findByRole("combobox");
      await userEvent.click(dropdown);
      expect(dropdown).toHaveAttribute("aria-expanded", "true");

      const options = await screen.findAllByRole("option");
      await userEvent.keyboard("{PageUp}");

      expect(options[0]).toHaveAttribute("aria-selected", "true");
    });

    it("should jump the visual focus down to the last option on 'PageDown'", async () => {
      const dropdown = await screen.findByRole("combobox");
      await userEvent.click(dropdown);
      expect(dropdown).toHaveAttribute("aria-expanded", "true");

      const options = await screen.findAllByRole("option");
      await userEvent.keyboard("{PageDown}");

      expect(options[2]).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Cases with rerender", () => {
    it("should allow the user to select an option", async () => {
      const { rerender } = render(
        <DropDownField
          dropDownFieldId="test-id"
          placeholder="Drop Down Field Test"
          options={mockOptions}
          onChange={onChange}
        />
      );

      const dropdown = await screen.findByRole("combobox");
      await userEvent.click(dropdown);

      expect(dropdown).toHaveAttribute("aria-expanded", "true");
      const options = await screen.findAllByRole("option");
      expect(options).toHaveLength(3);

      await userEvent.click(options[1]);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(mockOptions[1]);

      rerender(
        <DropDownField
          dropDownFieldId="test-id"
          placeholder="Drop Down Field Test"
          options={mockOptions}
          selected={mockOptions[1]}
          onChange={onChange}
        />
      );

      expect(dropdown).toHaveAttribute("aria-expanded", "false");
      expect(dropdown).toHaveTextContent("Option 2");
    });

    it("should choose selected option by pressing 'Tab' and close the dropdown", async () => {
      const { rerender } = render(
        <DropDownField
          dropDownFieldId="test-id"
          placeholder="Drop Down Field Test"
          selected={mockOptions[1]}
          options={mockOptions}
          onChange={onChange}
        />
      );

      const dropdown = await screen.findByRole("combobox");
      await userEvent.click(dropdown);
      expect(dropdown).toHaveAttribute("aria-expanded", "true");

      const options = await screen.findAllByRole("option");
      expect(options[1]).toHaveAttribute("aria-selected", "true");

      await userEvent.keyboard("{ArrowDown}");
      expect(options[2]).toHaveAttribute("aria-selected", "true");

      await userEvent.keyboard("{Tab}");

      rerender(
        <DropDownField
          dropDownFieldId="test-id"
          placeholder="Drop Down Field Test"
          options={mockOptions}
          selected={mockOptions[2]}
          onChange={onChange}
        />
      );

      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith(mockOptions[2]);
      expect(dropdown).toHaveAttribute("aria-expanded", "false");
      expect(dropdown).toHaveTextContent(mockOptions[2].name);
    });

    it("should choose selected option by pressing 'Alt' & 'ArrowUp', close the dropdown and focus it", async () => {
      const { rerender } = render(
        <DropDownField
          dropDownFieldId="test-id"
          placeholder="Drop Down Field Test"
          selected={mockOptions[1]}
          options={mockOptions}
          onChange={onChange}
        />
      );

      const dropdown = await screen.findByRole("combobox");
      await userEvent.click(dropdown);
      expect(dropdown).toHaveAttribute("aria-expanded", "true");

      const options = await screen.findAllByRole("option");
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Alt>}{ArrowUp}{/ArrowUp}{/Alt}");

      rerender(
        <DropDownField
          dropDownFieldId="test-id"
          placeholder="Drop Down Field Test"
          options={mockOptions}
          selected={mockOptions[2]}
          onChange={onChange}
        />
      );

      expect(dropdown).toHaveAttribute("aria-expanded", "false");
      expect(dropdown).toHaveFocus();
      expect(options[2]).toHaveAttribute("aria-selected", "true");
      expect(dropdown).toHaveTextContent("Option 3");
    });

    it("should open the menu and choose the selected option on 'Alt' & 'ArrowDown'", async () => {
      const { rerender } = render(
        <DropDownField
          dropDownFieldId="test-id"
          placeholder="Drop Down Field Test"
          selected={mockOptions[1]}
          options={mockOptions}
          onChange={onChange}
        />
      );

      const dropdown = await screen.findByRole("combobox");
      await userEvent.keyboard("{Tab}");
      expect(dropdown).toHaveFocus();

      await userEvent.keyboard("{Alt>}{ArrowDown}{/ArrowDown}{/Alt}");
      expect(dropdown).toHaveAttribute("aria-expanded", "true");

      const options = await screen.findAllByRole("option");
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Alt>}{ArrowDown}{/ArrowDown}{/Alt}");

      rerender(
        <DropDownField
          dropDownFieldId="test-id"
          placeholder="Drop Down Field Test"
          options={mockOptions}
          selected={mockOptions[2]}
          onChange={onChange}
        />
      );

      expect(options[2]).toHaveAttribute("aria-selected", "true");
      expect(dropdown).toHaveFocus();
      expect(dropdown).toHaveAttribute("aria-expanded", "false");
      expect(dropdown).toHaveTextContent("Option 3");
    });
  });
});
