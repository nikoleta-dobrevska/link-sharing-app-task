import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { Login } from "@/pages/Login";

const server = setupServer(
  http.post(`${import.meta.env.VITE_API}/login`, () => {
    return HttpResponse.json({ status: 200 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("logins successfully", async () => {
  render(<Login />);

  const email = await screen.findByLabelText(/Email address/, {
    selector: "input",
  });

  const password = await screen.findByLabelText(/Password/, {
    selector: "input",
  });

  fireEvent.change(email, { target: { value: "example@example.com" } });
  fireEvent.change(password, { target: { value: "12345678" } });

  fireEvent.click(screen.getByRole("button"));

  expect(screen.getByRole("heading")).toHaveTextContent("hello there");
  expect(screen.getByRole("button")).toBeDisabled();
});
