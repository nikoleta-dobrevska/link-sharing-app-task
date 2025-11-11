import { screen } from "@testing-library/react";
import { HttpStatusCode } from "axios";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { PreviewComponent } from "@/components/PreviewComponent/PreviewComponent";
import { queryClient } from "@/config/react-query";
import { renderWithAppContexts } from "@/test-utils/renderWithAppContexts";

describe("Preview Component", () => {
  afterEach(() => queryClient.clear());

  it("should correctly render the user's data after loading", async () => {
    const server = setupServer();
    server.listen();

    const mockedLinkProviders = [
      {
        id: 0,
        iconName: "string",
        name: "string",
        textColor: "rgba(233, 245, 193, 1)",
        backgroundColor: "rgba(167, 113, 75, 1)",
        allowedDomains: ["string"],
      },
      {
        id: 1,
        name: "string",
        iconName: "string",
        allowedDomains: ["string"],
        textColor: "rgba(210, 144, 220, 1)",
        backgroundColor: "rgb(95, 102, 145)",
      },
    ];

    const mockedUserLinks = [
      {
        linkProviderId: 0,
        link: "string",
        order: 0,
      },
      {
        linkProviderId: 1,
        link: "string",
        order: 1,
      },
    ];

    const mockedUserData = {
      id: 0,
      profilePicturePath: "string",
      firstName: "string",
      lastName: "string",
      email: "user@example.com",
    };

    server.use(
      http.get("http://localhost:2400/v1/link-providers", () => {
        return HttpResponse.json(mockedLinkProviders, {
          status: HttpStatusCode.Ok,
        });
      })
    );

    server.use(
      http.get("http://localhost:2400/v1/user-links", () => {
        return HttpResponse.json(mockedUserLinks, {
          status: HttpStatusCode.Ok,
        });
      })
    );

    server.use(
      http.get("http://localhost:2400/v1/profile", () => {
        return HttpResponse.json(mockedUserData, {
          status: HttpStatusCode.Ok,
        });
      })
    );

    renderWithAppContexts(<PreviewComponent />);

    const imgs = await screen.findAllByAltText("");
    expect(imgs[0]).toHaveAttribute(
      "src",
      `http://localhost:2400/v1/${mockedUserData.profilePicturePath}`
    );

    const userFullName = screen.queryByText(
      `${mockedUserData.firstName} ${mockedUserData.lastName}`
    );
    expect(userFullName).toBeInTheDocument();

    const userEmail = screen.queryByText(mockedUserData.email);
    expect(userEmail).toBeInTheDocument();

    const links = screen.queryAllByRole("link");
    expect(links).toHaveLength(2);

    expect(links[0]).toHaveAccessibleName(
      `Your ${mockedLinkProviders[0].name} link, opens a new tab`
    );
    expect(links[1]).toHaveAccessibleName(
      `Your ${mockedLinkProviders[1].name} link, opens a new tab`
    );

    expect(links[0]).toHaveAttribute("href", mockedUserLinks[0].link);
    expect(links[1]).toHaveAttribute("href", mockedUserLinks[1].link);

    server.resetHandlers();
    server.close();
  });

  it("should render the ui skeleton if no data is present", async () => {
    renderWithAppContexts(<PreviewComponent />);

    const placeholders = document.getElementsByTagName("div");

    const userFullNamePlaceholder = placeholders[3];
    expect(userFullNamePlaceholder.className).toEqual(
      expect.stringContaining("user-info__names-placeholder")
    );

    const userEmail = placeholders[4];
    expect(userEmail.className).toEqual(
      expect.stringContaining("user-info__email-placeholder")
    );

    const linksList = screen.getByRole("list");
    expect(linksList.childNodes.length).toBe(5);

    expect(linksList.children[0].className).toEqual(
      expect.stringContaining("user-link-placeholder")
    );
    expect(linksList.children[1].className).toEqual(
      expect.stringContaining("user-link-placeholder")
    );
    expect(linksList.children[2].className).toEqual(
      expect.stringContaining("user-link-placeholder")
    );
    expect(linksList.children[3].className).toEqual(
      expect.stringContaining("user-link-placeholder")
    );
    expect(linksList.children[4].className).toEqual(
      expect.stringContaining("user-link-placeholder")
    );
  });
});
