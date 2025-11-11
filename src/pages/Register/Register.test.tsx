import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type AxiosError, HttpStatusCode } from "axios";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { RoutePaths } from "@/constants";
import { Register } from "@/pages/Register";
import { renderWithAppContexts } from "@/test-utils/renderWithAppContexts";

const server = setupServer();

const mockNavigation = vi.fn();

vi.mock("react-router", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return { ...actual, useNavigate: () => mockNavigation };
});

describe("Register", () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    renderWithAppContexts(<Register />);
  });
  afterEach(() => {
    server.resetHandlers();
    vi.clearAllMocks();
  });
  afterAll(() => server.close());

  it("should not accept empty values", async () => {
    const registerButton = screen.getByRole("button");
    await userEvent.click(registerButton);

    const alerts = screen.getAllByRole("alert");
    expect(alerts[0]).toHaveTextContent("Can't be empty");
    expect(alerts[1]).toHaveTextContent("Can't be empty");
    expect(alerts[2]).toHaveTextContent("Can't be empty");
    expect(alerts[3]).toHaveTextContent("Please check again");
    expect(alerts[4]).toHaveTextContent("Can't be empty");
  });

  it("should not accept an invalid email address", async () => {
    const email = screen.getByLabelText(/Email/i);

    const INVALID_EMAILS = [
      "plainaddress",
      "#@%^%#$@#$@#.com",
      "@example.com",
      "Joe Smith <email@example.com>",
      "email.example.com",
      "email@example@example.com",
      ".email@example.com",
      "email.@example.com",
      "email..email@example.com",
      "あいうえお@example.com",
      "email@example.com (Joe Smith)",
      "email@example",
      "email@-example.com",
      "email@example.web",
      "email@111.222.333.44444",
      "email@example..com",
      "Abc..123@example.com",
      '"(),:;<>[\\]@example.com',
      'just"not"right@example.com',
      'this\\ is\\"really\\"not\\\\allowed@example.com',
    ];

    for (const invalidEmail in INVALID_EMAILS) {
      await userEvent.type(email, invalidEmail);
      expect(email).toHaveValue(invalidEmail);
      expect(email).toBeInvalid();

      const alerts = screen.getAllByRole("alert");
      expect(alerts[2]).toHaveTextContent("Invalid email address");
      await userEvent.clear(email);
    }
  });

  it("should describe password with the correct note", async () => {
    const password = screen.getByLabelText(/Create password/i, {
      selector: "input",
    });

    expect(password).toHaveAccessibleDescription(
      "Password must contain at least 8 characters"
    );
  });

  it("shold not accept a password under 8 characters", async () => {
    const password = screen.getByLabelText(/Create password/i);

    const passwordValue = "1234567";

    await userEvent.type(password, passwordValue);

    expect(password).toBeInvalid();

    const alerts = screen.getAllByRole("alert");
    expect(alerts[3]).toBeInTheDocument();
    expect(alerts[3]).toHaveTextContent("Please check again");
  });

  it("should match password fields", async () => {
    const password = screen.getByLabelText(/Create password/i);
    const confirmPassword = screen.getByLabelText(/Confirm password/i);

    const passwordValue = "12345678";

    await userEvent.type(password, passwordValue);
    await userEvent.type(confirmPassword, passwordValue);

    const alerts = screen.getAllByRole("alert");
    expect(alerts[3]).toBeEmptyDOMElement();
    expect(alerts[4]).toBeEmptyDOMElement();
  });

  it("should register successfully with valid data", async () => {
    server.use(
      http.post("http://localhost:2400/v1/register", () => {
        return HttpResponse.json({ status: HttpStatusCode.Created });
      })
    );

    const firstName = screen.getByLabelText(/First name/i);
    const lastName = screen.getByLabelText(/Last name/i);
    const email = screen.getByLabelText(/Email/i);
    const password = screen.getByLabelText(/Create password/i);
    const confirmPassword = screen.getByLabelText(/Confirm password/i);

    await userEvent.type(firstName, "John");
    await userEvent.type(lastName, "Doe");
    await userEvent.type(email, "email@email.com");
    const passwordValue = "12345678";
    await userEvent.type(password, passwordValue);
    await userEvent.type(confirmPassword, passwordValue);

    const registerButton = screen.getByRole("button");
    await userEvent.click(registerButton);

    await waitFor(() => {
      expect(mockNavigation).toHaveBeenCalledWith(RoutePaths.login);
    });
  });

  it("should throw global error message if an error occurs with descriptive message", async () => {
    server.use(
      http.post("http://localhost:2400/v1/register", () => {
        return HttpResponse.json(
          {
            error: { message: "Network Error" } as AxiosError,
          },
          { status: HttpStatusCode.BadRequest }
        );
      })
    );

    const firstName = screen.getByLabelText(/First name/i);
    const lastName = screen.getByLabelText(/Last name/i);
    const email = screen.getByLabelText(/Email/i);
    const password = screen.getByLabelText(/Create password/i);
    const confirmPassword = screen.getByLabelText(/Confirm password/i);

    await userEvent.type(firstName, "John");
    await userEvent.type(lastName, "Doe");
    await userEvent.type(email, "email@email.com");
    const passwordValue = "12345678";
    await userEvent.type(password, passwordValue);
    await userEvent.type(confirmPassword, passwordValue);

    const registerButton = screen.getByRole("button");
    await userEvent.click(registerButton);

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts[0]).toHaveTextContent("Network Error");
      expect(mockNavigation).toHaveBeenCalledTimes(0);
    });
  });

  it("should throw default global error message if an error occurs with no descriptive message", async () => {
    server.use(
      http.post("http://localhost:2400/v1/register", () => {
        return HttpResponse.json(
          {
            error: {
              message: null,
            },
          },
          { status: HttpStatusCode.BadRequest }
        );
      })
    );

    const firstName = screen.getByLabelText(/First name/i);
    const lastName = screen.getByLabelText(/Last name/i);
    const email = screen.getByLabelText(/Email/i);
    const password = screen.getByLabelText(/Create password/i);
    const confirmPassword = screen.getByLabelText(/Confirm password/i);

    await userEvent.type(firstName, "John");
    await userEvent.type(lastName, "Doe");
    await userEvent.type(email, "email@email.com");
    const passwordValue = "12345678";
    await userEvent.type(password, passwordValue);
    await userEvent.type(confirmPassword, passwordValue);

    const registerButton = screen.getByRole("button");
    await userEvent.click(registerButton);

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts[0]).toHaveTextContent(
        "Oops, something went wrong! Please try again later."
      );
      expect(mockNavigation).toHaveBeenCalledTimes(0);
    });
  });

  it("shows global error message if a non-server error occurs", async () => {
    server.use(
      http.post("http://localhost:2400/v1/register", async ({ request }) => {
        const formData = await request.formData();
        formData.get("email");
        formData.get("firstName");
        formData.get("lastName");
        formData.get("password");
        formData.get("confirmPassword");

        return HttpResponse.json(
          {
            error: new SyntaxError(),
          },
          { status: HttpStatusCode.BadRequest }
        );
      })
    );

    const firstName = screen.getByLabelText(/First name/i);
    const lastName = screen.getByLabelText(/Last name/i);
    const email = screen.getByLabelText(/Email/i);
    const password = screen.getByLabelText(/Create password/i);
    const confirmPassword = screen.getByLabelText(/Confirm password/i);

    await userEvent.type(firstName, "John");
    await userEvent.type(lastName, "Doe");
    await userEvent.type(email, "email@email.com");
    const passwordValue = "12345678";
    await userEvent.type(password, passwordValue);
    await userEvent.type(confirmPassword, passwordValue);

    const registerButton = screen.getByRole("button");
    await userEvent.click(registerButton);

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts[0]).toHaveTextContent(
        "Oops, something went wrong! Please try again later."
      );
      expect(mockNavigation).toHaveBeenCalledTimes(0);
    });
  });
});
