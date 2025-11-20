import { LOCAL_STORAGE_UPDATED_CUSTOM_EVENT, RoutePaths } from "@/constants";
import { AuthGuard } from "@/layouts/AuthGuard/AuthGuard";
// eslint-disable-next-line import/no-namespace
import * as localeStorageFunctions from "@/localStorage";
import { renderWithAppContexts } from "@/test-utils/renderWithAppContexts";

const mockNavigation = vi.fn();

vi.mock("react-router", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return { ...actual, useNavigate: () => mockNavigation };
});

const getLocaleStorageItemSpy = vi.spyOn(
  localeStorageFunctions,
  "getLocalStorageItem"
);

const setLocalStorageItemSpy = vi.spyOn(
  localeStorageFunctions,
  "setLocalStorageItem"
);

setLocalStorageItemSpy.mockImplementation((key, value) => {
  window.localStorage.setItem(key, value);

  window.dispatchEvent(
    new CustomEvent(LOCAL_STORAGE_UPDATED_CUSTOM_EVENT, {
      detail: { key },
    })
  );
});

describe("Auth Guard", () => {
  beforeEach(() => {
    localStorage.clear();
    getLocaleStorageItemSpy.mockClear();
    setLocalStorageItemSpy.mockClear();
  });
  afterEach(() => vi.clearAllMocks());

  it("should render the outlet if a valid token is present in local storage", async () => {
    setLocalStorageItemSpy("token", "mockToken");

    getLocaleStorageItemSpy.mockReturnValue("token");

    renderWithAppContexts(<AuthGuard />);

    expect(setLocalStorageItemSpy).toHaveBeenCalledWith("token", "mockToken");
    expect(getLocaleStorageItemSpy).toHaveBeenCalledWith("token");
    expect(mockNavigation).not.toHaveBeenCalledWith(RoutePaths.login);
  });

  it("should navigate back to the login page if no token is present in local storage", async () => {
    getLocaleStorageItemSpy.mockReturnValue(null);

    renderWithAppContexts(<AuthGuard />);

    expect(getLocaleStorageItemSpy).toHaveBeenCalledWith("token");
    expect(mockNavigation).toHaveBeenCalledOnce();
    expect(mockNavigation).toHaveBeenCalledWith(RoutePaths.login);
  });
});
