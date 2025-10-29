import { fireEvent, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { Login } from "@/pages/Login/Login";
import { renderWithAppContexts } from "@/test-utils/renderWithAppContexts";

const server = setupServer(
  http.post(`${import.meta.env.VITE_API}/login`, () => {
    return HttpResponse.json({ status: 200 });
  })
);
//TO DO: fix in next commit
describe("Login", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it.skip("logins successfully", () => {
    renderWithAppContexts(<Login />);

    const email = screen.getByLabelText(/Email address/);

    const password = screen.getByLabelText(/Password/);

    fireEvent.change(email, { target: { value: "example@example.com" } });
    fireEvent.change(password, { target: { value: "12345678" } });

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("heading")).toHaveTextContent("hello there");
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
