import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpStatusCode } from "axios";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { RoutePaths } from "@/constants";
import { Login } from "@/pages/Login/Login";
import { renderWithAppContexts } from "@/test-utils/renderWithAppContexts";

const server = setupServer();

const mockNavigation = vi.fn();

vi.mock("react-router", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return { ...actual, useNavigate: () => mockNavigation };
});

const mockSetToken = vi.fn();

describe("Login", () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    renderWithAppContexts(<Login />);
  });
  afterEach(() => {
    server.resetHandlers();
    vi.clearAllMocks();
    globalThis.Storage.prototype.removeItem = mockSetToken;
  });
  afterAll(() => server.close());

  it("fails to login with wrong email", async () => {
    server.use(
      http.post("http://localhost:2400/v1/login", () => {
        return new HttpResponse(
          {
            error: { message: "One or more validation errors have occurred." },
          },
          { status: HttpStatusCode.BadRequest }
        );
      })
    );

    const email = screen.getByLabelText(/Email address/i);
    const password = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    await userEvent.type(email, "wrong@email.com");
    await userEvent.type(password, "12345678");
    expect(email).toHaveValue("wrong@email.com");
    expect(password).toHaveValue("12345678");

    await userEvent.click(loginButton);

    await waitFor(() => {
      const globalAlert = screen.getByText("Wrong email and/or password!");
      expect(globalAlert).toBeInTheDocument();
    });
  });

  it("fails to login with wrong password", async () => {
    server.use(
      http.post("http://localhost:2400/v1/login", () => {
        return new HttpResponse(
          {
            error: { message: "One or more validation errors have occurred." },
          },
          { status: HttpStatusCode.BadRequest }
        );
      })
    );

    const email = screen.getByLabelText(/Email address/i);
    const password = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    await userEvent.type(email, "example@example.com");
    await userEvent.type(password, "8u98u89u89");
    expect(email).toHaveValue("example@example.com");
    expect(password).toHaveValue("8u98u89u89");

    await userEvent.click(loginButton);

    await waitFor(() => {
      const globalAlert = screen.getByText("Wrong email and/or password!");
      expect(globalAlert).toBeInTheDocument();
    });
  });

  it("logins successfully with valid credentials", async () => {
    server.use(
      http.post("http://localhost:2400/v1/login", () => {
        return HttpResponse.json(
          { token: "mockToken" },
          {
            status: HttpStatusCode.Ok,
            headers: {
              Authorization: "Bearer mockToken",
              "Content-Type": "application/json",
            },
          }
        );
      })
    );

    globalThis.Storage.prototype.setItem = mockSetToken;

    const email = screen.getByLabelText(/Email address/i);
    const password = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    await userEvent.type(email, "example@example.com");
    await userEvent.type(password, "12345678");
    expect(email).toHaveValue("example@example.com");
    expect(password).toHaveValue("12345678");

    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith("token", {
        token: "mockToken",
      });

      expect(mockNavigation).toHaveBeenCalledWith(RoutePaths.links);
    });
  });

  it("fails to login with missing email", async () => {
    const password = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    await userEvent.type(password, "12345678");
    expect(password).toHaveValue("12345678");

    await userEvent.click(loginButton);

    await waitFor(() => {
      const emailAlert = screen.getByText("Can't be empty");
      expect(emailAlert).toBeInTheDocument();
      const email = screen.getByLabelText(/Email/i);
      expect(email).toBeInvalid();
    });
  });

  it("fails to login with missing password", async () => {
    const email = screen.getByLabelText(/Email/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    await userEvent.type(email, "example@example.com");
    expect(email).toHaveValue("example@example.com");

    await userEvent.click(loginButton);

    await waitFor(() => {
      const passwordAlert = screen.getByText("Please check again");
      expect(passwordAlert).toBeInTheDocument();
      const password = screen.getByLabelText(/Password/i);
      expect(password).toBeInvalid();
    });
  });
});
