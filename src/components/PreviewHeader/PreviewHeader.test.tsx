import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PreviewHeader } from "@/components/PreviewHeader/PreviewHeader";
import { RoutePaths } from "@/constants";
import { renderWithAppContexts } from "@/test-utils/renderWithAppContexts";

const mockNavigation = vi.fn();

vi.mock("react-router", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return { ...actual, useNavigate: () => mockNavigation };
});

describe("Preview Header", () => {
  const mockedUserId = 1;

  beforeEach(() => {
    renderWithAppContexts(<PreviewHeader userId={mockedUserId} />, {
      usesReactToastify: true,
    });

    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: vi.fn(),
      },
      configurable: true,
    });
  });
  afterEach(() => vi.resetAllMocks());
  afterAll(() => vi.clearAllMocks());

  it("should redirect to links page", async () => {
    const buttons = screen.getAllByRole("button");
    const backToEditorButton = buttons[0];
    expect(backToEditorButton).toHaveAccessibleName("Back to Editor");

    await userEvent.click(backToEditorButton);

    expect(mockNavigation).toHaveBeenCalledWith(RoutePaths.links);
  });

  it("should copy user's profile link to the clipboard", async () => {
    const mockedProfileLink = `http://localhost:5173/profile/${mockedUserId}`;

    const buttons = screen.getAllByRole("button");
    const shareLinkButton = buttons[1];
    await userEvent.click(shareLinkButton);

    const writeTextSpy = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();

    expect(writeTextSpy).toHaveBeenCalledWith(mockedProfileLink);
    expect(writeTextSpy).toHaveBeenCalledTimes(1);
  });

  it("should display a success toast notification after copying link", async () => {
    const buttons = screen.getAllByRole("button");
    const shareLinkButton = buttons[1];
    expect(shareLinkButton).toHaveAccessibleName("Share Link");

    await userEvent.click(shareLinkButton);

    expect(
      screen.getByText("The link has been copied to your clipboard!")
    ).toBeInTheDocument();
  });

  it("should display an error toast notification if an error occurs", async () => {
    const error = "Mock clipboard error";

    const buttons = screen.getAllByRole("button");
    const shareLinkButton = buttons[1];

    const failWriteTextSpy = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockRejectedValue(new Error(error));

    await userEvent.click(shareLinkButton);

    expect(failWriteTextSpy).toHaveBeenCalledOnce();

    expect(
      screen.getByText(`An error occured: Error: ${error}. Please try again.`)
    ).toBeInTheDocument();
  });
});
