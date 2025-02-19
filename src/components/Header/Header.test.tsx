import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("@context/FavoritesContext", () => ({
  useFavorites: () => ({
    favorites: [
      { id: 1, name: "Spider-Man" },
      { id: 2, name: "Iron Man" },
    ],
  }),
}));

describe("Header Component", () => {
  it("should render the Marvel logo", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoImage = screen.getByAltText("marvel_logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/src/assets/marvel_logo.png");
  });

  it("should render the favorite icon (heart)", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const favoriteIcon = screen.getByTestId("favorite-icon");
    expect(favoriteIcon).toBeInTheDocument();
  });

  it("should render the favorite count", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const favoriteCount = screen.getByText("2");
    expect(favoriteCount).toBeInTheDocument();
  });
});
