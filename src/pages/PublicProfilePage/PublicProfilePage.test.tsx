import { screen, waitFor } from "@testing-library/react";
import { HttpStatusCode } from "axios";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { useParams } from "react-router";

import { PublicProfilePage } from "@/pages/PublicProfilePage/PublicProfilePage";
import { renderWithAppContexts } from "@/test-utils/renderWithAppContexts";

const server = setupServer();

vi.mock("react-router", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return { ...actual, useParams: vi.fn() };
});

describe("Public Profile Page", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    vi.resetAllMocks();
  });
  afterAll(() => {
    server.close();
    vi.clearAllMocks();
  });

  it("should correctly render the user's public profile data based on the user's id", async () => {
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

    const mockedPublicUserDetailsData = {
      profilePicturePath: "string",
      firstName: "string",
      lastName: "string",
      email: "string@email.com",
      userLinks: [
        {
          linkProviderId: 0,
          link: "string",
          order: 0,
        },
      ],
    };

    server.use(
      http.get<{ userId: string }>(
        `http://localhost:2400/v1/profile/:userId`,
        () => {
          return HttpResponse.json(mockedPublicUserDetailsData, {
            status: HttpStatusCode.Ok,
          });
        }
      )
    );

    vi.mocked(useParams).mockReturnValue({ userId: "111" });

    renderWithAppContexts(<PublicProfilePage />);

    server.use(
      http.get("http://localhost:2400/v1/link-providers", () => {
        return HttpResponse.json(mockedLinkProviders, {
          status: HttpStatusCode.Ok,
        });
      })
    );

    await waitFor(() => {
      const imgs = screen.getAllByAltText("");
      expect(imgs[0]).toHaveAttribute(
        "src",
        `http://localhost:2400/v1/${mockedPublicUserDetailsData.profilePicturePath}`
      );
    });

    const userFullName = screen.getByText(
      `${mockedPublicUserDetailsData.firstName} ${mockedPublicUserDetailsData.lastName}`
    );
    expect(userFullName).toBeInTheDocument();

    const userEmail = screen.queryByText(mockedPublicUserDetailsData.email);
    expect(userEmail).toBeInTheDocument();

    const links = screen.queryAllByRole("link");
    expect(links).toHaveLength(1);

    expect(links[0]).toHaveAccessibleName(
      `User's ${mockedLinkProviders[0].name} link, opens a new tab`
    );

    expect(links[0]).toHaveAttribute(
      "href",
      mockedPublicUserDetailsData.userLinks[0].link
    );
  });
});
