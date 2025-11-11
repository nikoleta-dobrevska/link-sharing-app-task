import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { HttpStatusCode } from "axios";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { ProfileDetailsForm } from "@/components/ProfileDetailsForm/ProfileDetailsForm";
import { queryClient } from "@/config/react-query";
import { PROFILE_PICTURE_SIZE_LIMIT } from "@/constants";
import { renderWithAppContexts } from "@/test-utils/renderWithAppContexts";

const server = setupServer();

describe("Profile Details Form", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    queryClient.clear();
    server.resetHandlers();
    vi.resetAllMocks();
    globalThis.URL.revokeObjectURL = vi.fn(() => "mockfile.png");
  });
  afterAll(() => {
    server.close();
    vi.clearAllMocks();
  });

  it("should delete profile picture after pressing 'Delete Picture' button", async () => {
    const mockedUserData = {
      id: 1,
      profilePicturePath: "string" as string | null,
      firstName: "string",
      lastName: "string",
      email: "string@email.com",
    };

    globalThis.URL.createObjectURL = vi.fn(
      () => `http://localhost:2400/v1/${mockedUserData.profilePicturePath}`
    );

    server.use(
      http.get("http://localhost:2400/v1/profile", () => {
        return HttpResponse.json(
          { ...mockedUserData },
          {
            status: HttpStatusCode.Ok,
          }
        );
      }),
      http.delete("http://localhost:2400/v1/profile/profile-picture", () => {
        mockedUserData.profilePicturePath = null;

        globalThis.URL.revokeObjectURL = vi.fn(
          () => `http://localhost:2400/v1/${mockedUserData.profilePicturePath}`
        );

        return HttpResponse.json({
          status: HttpStatusCode.NoContent,
        });
      })
    );

    renderWithAppContexts(<ProfileDetailsForm />);

    await waitFor(() => {
      const preview = screen.getByAltText("");

      expect(preview).toHaveAttribute(
        "src",
        `http://localhost:2400/v1/${mockedUserData.profilePicturePath}`
      );
    });

    const deleteButton = screen.getByRole("button", { name: "Delete Picture" });
    expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByAltText("")).not.toBeInTheDocument();
      expect(deleteButton).not.toBeInTheDocument();
    });
  });

  it("should render a preview of the user's uploaded image and remove the preview after clicking 'Remove Preview' button", async () => {
    globalThis.URL.createObjectURL = vi.fn(() => "mockfile.png");

    const mockedUserData = {
      id: 1,
      profilePicturePath: "string",
      firstName: "string",
      lastName: "string",
      email: "string@email.com",
    };

    server.use(
      http.get("http://localhost:2400/v1/profile", () => {
        return HttpResponse.json(mockedUserData, {
          status: HttpStatusCode.Ok,
        });
      })
    );

    renderWithAppContexts(<ProfileDetailsForm />);

    const preview = await screen.findByAltText("");
    expect(preview).toHaveAttribute(
      "src",
      `http://localhost:2400/v1/${mockedUserData.profilePicturePath}`
    );

    const file = new File(["mock file"], "mockfile.png", { type: "image/png" });
    await userEvent.upload(screen.getByLabelText(/Profile picture/i), file);
    expect(preview).toHaveAttribute("src", "mockfile.png");

    const removePreviewButton = await screen.findByRole("button", {
      name: "Remove Preview",
    });
    await userEvent.click(removePreviewButton);

    await waitFor(() => {
      expect(removePreviewButton).not.toBeInTheDocument();
      expect(preview).toHaveAttribute(
        "src",
        `http://localhost:2400/v1/${mockedUserData.profilePicturePath}`
      );
    });
  });

  it("should allow user to upload a profile picture and display a toast notification after saving changes", async () => {
    globalThis.URL.createObjectURL = vi.fn(() => "mockfile.png");

    const mockedUserData = {
      id: 1,
      profilePicturePath: null,
      firstName: "string",
      lastName: "string",
      email: "string@email.com",
    };

    server.use(
      http.get("http://localhost:2400/v1/profile", () => {
        return HttpResponse.json(mockedUserData, {
          status: HttpStatusCode.Ok,
        });
      }),
      http.put("http://localhost:2400/v1/profile", async ({ request }) => {
        const formData = await request.formData();

        formData.get("email");
        formData.get("firstName");
        formData.get("lastName");
        formData.get("profilePicture");

        return HttpResponse.json({}, { status: HttpStatusCode.NoContent });
      })
    );

    renderWithAppContexts(<ProfileDetailsForm />, {
      usesReactToastify: true,
    });

    const file = new File(["mock file"], "mockfile.png", { type: "image/png" });

    await userEvent.upload(screen.getByLabelText(/Profile picture/i), file);
    expect(
      screen.getByRole("button", { name: "Remove Preview" })
    ).toBeInTheDocument();
    const preview = await screen.findByAltText("");
    expect(preview).toHaveAttribute("src", "mockfile.png");

    const saveButton = screen.getByRole("button", { name: /Save/i });
    await userEvent.click(saveButton);

    expect(
      screen.getByText("Your changes have been successfully saved!")
    ).toBeInTheDocument();
  });

  it("should not allow user to upload a file over 5MB or accept files of the wrong type", async () => {
    renderWithAppContexts(<ProfileDetailsForm />);

    const profilePictureInput = screen.getByLabelText(/Profile picture/i);

    expect(profilePictureInput).toHaveAttribute(
      "accept",
      "image/png, image/jpeg, image/jpg"
    );

    const largeBlob = new Blob([
      new Uint8Array(PROFILE_PICTURE_SIZE_LIMIT + 500),
    ]);

    const file = new File([largeBlob], "mockfile.png", { type: "image/png" });

    await userEvent.upload(profilePictureInput, file);

    const alerts = screen.getAllByRole("alert");

    await waitFor(() => {
      expect(alerts[0]).toHaveTextContent("Image must be below 5MB");
    });
  });

  it("should not accept empty values for the text fields", async () => {
    renderWithAppContexts(<ProfileDetailsForm />);

    const firstName = screen.getByLabelText("First name*");
    const lastName = screen.getByLabelText("Last name*");
    const email = screen.getByLabelText("Email");

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();

    const saveButton = screen.getByRole("button", { name: /Save/i });
    await userEvent.click(saveButton);

    const alerts = await screen.findAllByRole("alert");

    await waitFor(() => {
      expect(alerts[1]).toHaveTextContent("Can't be empty");
      expect(alerts[2]).toHaveTextContent("Can't be empty");
      expect(alerts[3]).toHaveTextContent("Invalid email address");
    });
  });

  it("should allow user to edit their data", async () => {
    const mockedUserData = {
      id: 1,
      profilePicturePath: null,
      firstName: "string",
      lastName: "string",
      email: "string@email.com",
    };

    server.use(
      http.get("http://localhost:2400/v1/profile", () => {
        return HttpResponse.json(mockedUserData, {
          status: HttpStatusCode.Ok,
        });
      }),
      http.put("http://localhost:2400/v1/profile", async ({ request }) => {
        const formData = await request.formData();

        formData.get("email");
        formData.get("firstName");
        formData.get("lastName");
        formData.get("profilePicture");

        return HttpResponse.json({}, { status: HttpStatusCode.NoContent });
      })
    );

    renderWithAppContexts(<ProfileDetailsForm />, {
      path: "/profile-details",
      initialEntries: ["/profile-details"],
      usesReactToastify: true,
    });

    const firstName = await screen.findByLabelText("First name*");
    const lastName = await screen.findByLabelText("Last name*");
    const email = await screen.findByLabelText("Email");

    expect(firstName).toHaveValue("string");
    expect(lastName).toHaveValue("string");
    expect(email).toHaveValue("string@email.com");

    await userEvent.clear(firstName);
    await userEvent.type(firstName, "firstName");
    await userEvent.clear(lastName);
    await userEvent.type(lastName, "lastName");
    await userEvent.clear(email);
    await userEvent.type(email, "email@email.com");

    const saveButton = screen.getByRole("button", { name: /Save/i });
    await userEvent.click(saveButton);

    expect(firstName).toHaveValue("firstName");
    expect(lastName).toHaveValue("lastName");
    expect(email).toHaveValue("email@email.com");

    expect(
      await screen.findByText("Your changes have been successfully saved!")
    ).toBeInTheDocument();
  });
});
