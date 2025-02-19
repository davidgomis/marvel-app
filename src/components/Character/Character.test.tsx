import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Character } from "./Character";
import { FavoritesProvider, useFavorites } from "@context/FavoritesContext";
import { vi } from "vitest";

vi.mock("@context/FavoritesContext", () => ({
  useFavorites: vi.fn(),
  FavoritesProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("Character Component", () => {
  it("should render the component in the document", () => {
    const mockFavorites = ["1"];
    const mockToggleFavorite = vi.fn();

    (useFavorites as vi.Mock).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite: mockToggleFavorite,
    });

    render(
      <MemoryRouter>
        <FavoritesProvider>
          <Character
            id="1"
            name="Spider-Man"
            thumbnail={{ path: "http://example.com/image", extension: "jpg" }}
          />
        </FavoritesProvider>
      </MemoryRouter>
    );

    const characterElement = screen.getByText("Spider-Man");
    expect(characterElement).toBeInTheDocument();
  });

  it("should render the description if it is provided", () => {
    const mockFavorites = ["1"];
    const mockToggleFavorite = vi.fn();

    (useFavorites as vi.Mock).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite: mockToggleFavorite,
    });

    render(
      <MemoryRouter>
        <FavoritesProvider>
          <Character
            id="1"
            name="Spider-Man"
            thumbnail={{ path: "http://example.com/image", extension: "jpg" }}
            description="This is a test description"
            isDetail
          />
        </FavoritesProvider>
      </MemoryRouter>
    );

    const descriptionElement = screen.getByText("This is a test description");
    expect(descriptionElement).toBeInTheDocument();
  });

  it("should render the filled heart icon if the character is a favorite", () => {
    const mockFavorites = ["1"];
    const mockToggleFavorite = vi.fn();

    (useFavorites as vi.Mock).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite: mockToggleFavorite,
    });

    render(
      <MemoryRouter>
        <FavoritesProvider>
          <Character
            id="1"
            name="Spider-Man"
            thumbnail={{ path: "http://example.com/image", extension: "jpg" }}
          />
        </FavoritesProvider>
      </MemoryRouter>
    );

    const filledHeartIcon = screen.getByTestId("filled-heart-icon");
    expect(filledHeartIcon).toBeInTheDocument();
    expect(filledHeartIcon).toHaveClass("active");
  });

  it("should render the outlined heart icon if the character is not a favorite", () => {
    const mockFavorites = ["2"];
    const mockToggleFavorite = vi.fn();

    (useFavorites as vi.Mock).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite: mockToggleFavorite,
    });

    render(
      <MemoryRouter>
        <FavoritesProvider>
          <Character
            id="1"
            name="Spider-Man"
            thumbnail={{ path: "http://example.com/image", extension: "jpg" }}
          />
        </FavoritesProvider>
      </MemoryRouter>
    );

    const outlinedHeartIcon = screen.getByTestId("outlined-heart-icon");
    expect(outlinedHeartIcon).toBeInTheDocument();
    expect(outlinedHeartIcon).not.toHaveClass("active");
  });
});
