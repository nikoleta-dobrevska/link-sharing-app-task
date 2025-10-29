import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "@/components/ui/Button/Button";

// TODO: This is an example. Remove when implementing real tests.
describe("Button", () => {
  it("should render correctly", () => {
    render(
      <Button variant="primary" size="md">
        Test
      </Button>
    );

    const button = screen.queryByText(/test/i);

    expect(button).toBeInTheDocument();
  });

  it("should call onClick event on user click", async () => {
    const mockFn = vi.fn();

    render(
      <Button variant="primary" size="md" onClick={mockFn}>
        Test
      </Button>
    );

    const button = screen.getByText(/test/i);

    await userEvent.click(button);

    expect(mockFn).toHaveBeenCalledOnce();
  });
});
