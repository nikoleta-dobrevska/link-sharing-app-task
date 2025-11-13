import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { HttpStatusCode } from "axios";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { LinksList } from "@/components/links/LinksList/LinksList";
import { renderWithAppContexts } from "@/test-utils/renderWithAppContexts";

const server = setupServer();

describe("Links List", () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    const mockedLinkProviders = [
      {
        id: 0,
        iconName: "string",
        name: "Git Hub",
        backgroundColor: "rgba(167, 113, 75, 1)",
        textColor: "rgba(233, 245, 193, 1)",
        allowedDomains: ["github.com"],
      },
      {
        id: 1,
        iconName: "string",
        name: "Git Lab",
        backgroundColor: "rgb(95, 102, 145)",
        textColor: "rgba(210, 144, 220, 1)",
        allowedDomains: ["gitlab.com"],
      },
    ];

    server.use(
      http.get("http://localhost:2400/v1/link-providers", () => {
        return HttpResponse.json(mockedLinkProviders, {
          status: HttpStatusCode.Ok,
        });
      })
    );
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it("should load the empty links list component if the user has not added links yet", async () => {
    const userLinks = [{}];
    userLinks.length = 0;

    server.use(
      http.get("http://localhost:2400/v1/user-links", () => {
        return HttpResponse.json(userLinks, {
          status: HttpStatusCode.Ok,
        });
      })
    );

    renderWithAppContexts(<LinksList />);

    expect(userLinks).not.toContain(Object);

    const emptyLinksListHeading = await screen.findByRole("heading");
    expect(emptyLinksListHeading).toBeInTheDocument();
    expect(emptyLinksListHeading).toHaveTextContent("Let's get you started");

    const emptyLinksListParagraph = await screen.findByRole("paragraph");
    expect(emptyLinksListParagraph).toBeInTheDocument();
    expect(emptyLinksListParagraph).toHaveTextContent(
      "Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!"
    );

    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeDisabled();
  });

  it("should allow the user to add a new link", async () => {
    server.use(
      http.get("http://localhost:2400/v1/user-links", () => {
        return new HttpResponse(HttpStatusCode.Ok);
      }),
      http.put("http://localhost:2400/v1/user-links", async ({ request }) => {
        const data = await request.json();

        return new HttpResponse(data, { status: HttpStatusCode.Ok });
      })
    );

    renderWithAppContexts(<LinksList />);

    const addLinkButton = await screen.findByRole("button", {
      name: "Add new link",
    });
    expect(addLinkButton).toBeInTheDocument();
    await userEvent.click(addLinkButton);

    const dropDownField = screen.getByRole("combobox");
    expect(dropDownField).toBeInTheDocument();
    await userEvent.click(dropDownField);
    await userEvent.click(screen.getByText("Git Hub", { selector: "li" }));

    const linkInput = screen.getByLabelText("Link");
    expect(linkInput).toBeInTheDocument();
    await userEvent.type(linkInput, "https://www.github.com/mocklink");

    const saveButton = await screen.findByRole("button", { name: "Save" });
    await userEvent.click(saveButton);

    await waitFor(() => {
      const linksList = screen.getByRole("list");
      expect(linksList.childNodes.length).toBe(1);
      expect(linkInput).toHaveValue("https://www.github.com/mocklink");
    });
  });

  it("should load the user's already added links", async () => {
    const mockedUserLinks = [
      {
        linkProviderId: 0,
        link: "https://www.github.com/mocklink",
        order: 0,
      },
    ];

    server.use(
      http.get("http://localhost:2400/v1/user-links", () => {
        return HttpResponse.json(mockedUserLinks, {
          status: HttpStatusCode.Ok,
        });
      })
    );

    renderWithAppContexts(<LinksList />);

    const linksList = await screen.findByRole("list");
    expect(linksList.childNodes.length).toBe(1);

    await waitFor(async () => {
      const dropdown = await screen.findByRole("combobox");
      expect(dropdown).toHaveTextContent("Git Hub");

      const linkInputs = screen.getAllByLabelText("Link");
      expect(linkInputs[0]).toHaveDisplayValue(
        "https://www.github.com/mocklink"
      );
    });
  });

  it("should allow the user to update their existing links", async () => {
    const mockedUserLinks = [
      {
        linkProviderId: 0,
        link: "https://www.github.com/mocklink",
        order: 0,
      },
    ];

    server.use(
      http.get("http://localhost:2400/v1/user-links", () => {
        return HttpResponse.json(mockedUserLinks, {
          status: HttpStatusCode.Ok,
        });
      })
    );

    renderWithAppContexts(<LinksList />);

    const linksList = await screen.findByRole("list");
    expect(linksList.childNodes.length).toBe(1);

    const dropdown = await screen.findByRole("combobox");

    const link = await screen.findByLabelText("Link");
    expect(link).toHaveValue("https://www.github.com/mocklink");

    await userEvent.click(dropdown);

    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(2);

    await userEvent.click(options[1]);
    await userEvent.clear(link);
    await userEvent.type(link, "https://www.gitlab.com/mocklink");

    const saveButton = await screen.findByRole("button", { name: "Save" });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(dropdown).toHaveTextContent("Git Lab");
      expect(link).toHaveValue("https://www.gitlab.com/mocklink");
    });
  });

  it("should allow the user to remove an added link", async () => {
    const mockedUserLinks = [
      {
        linkProviderId: 0,
        link: "https://www.github.com/mocklink",
        order: 0,
      },
    ];

    server.use(
      http.get("http://localhost:2400/v1/user-links", () => {
        return HttpResponse.json(mockedUserLinks, {
          status: HttpStatusCode.Ok,
        });
      }),
      http.delete("http://localhost:2400/v1/user-links/:linkProviderId", () => {
        return new HttpResponse(HttpStatusCode.NoContent);
      })
    );

    renderWithAppContexts(<LinksList />);

    const linksList = await screen.findByRole("list");
    expect(linksList.childNodes.length).toBe(1);

    const removeButton = await screen.findByRole("button", { name: "Remove" });
    await userEvent.click(removeButton);

    expect(linksList).not.toBeInTheDocument();
  });

  it("should allow the user to remove a generated link field even if the link has not been added to the database", async () => {
    renderWithAppContexts(<LinksList />);

    const addLinkButton = await screen.findByRole("button", {
      name: "Add new link",
    });
    await userEvent.click(addLinkButton);

    const linkField = await screen.findByRole("listitem");
    expect(linkField).toBeInTheDocument();
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
    expect(linkField).toBeInTheDocument();
    const linkInput = screen.getByLabelText("Link");
    expect(linkInput).toBeInTheDocument();

    const removeButton = await screen.findByRole("button", { name: "Remove" });
    await userEvent.click(removeButton);

    expect(linkField).not.toBeInTheDocument();
    expect(dropdown).not.toBeInTheDocument();
    expect(linkInput).not.toBeInTheDocument();
  });

  it("should throw an error if the link's domain doesn't match that of the chosen link provider", async () => {
    renderWithAppContexts(<LinksList />);

    const addLinkButton = await screen.findByRole("button", {
      name: "Add new link",
    });
    await userEvent.click(addLinkButton);

    const dropdown = await screen.findByRole("combobox");
    const linkInput = await screen.findByLabelText("Link");

    await userEvent.click(dropdown);
    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(2);
    await userEvent.click(options[1]);
    expect(options[1]).toHaveTextContent("Git Lab");

    await userEvent.type(linkInput, "https://www.github.com/mocklink");

    const saveButton = await screen.findByRole("button", { name: "Save" });
    await userEvent.click(saveButton);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Please check the URL");
  });
});
