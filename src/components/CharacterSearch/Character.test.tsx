import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CharacterSearch } from "./CharacterSearch";

import { vi } from "vitest";
import { getCharactersByName } from "@api/marvelApi";

vi.mock("@api/marvelApi", () => ({
  getCharactersByName: vi.fn(),
}));

describe("CharacterSearch Component", () => {
  const mockOnResults = vi.fn();
  const initialCharacters = [
    { id: "1", name: "Spider-Man", thumbnail: { path: "", extension: "" } },
    { id: "2", name: "Iron Man", thumbnail: { path: "", extension: "" } },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should search in the API when searchSource is 'api'", async () => {
    const apiResults = [
      { id: "3", name: "Thor", thumbnail: { path: "", extension: "" } },
    ];
    (getCharactersByName as vi.Mock).mockResolvedValue(apiResults);

    render(
      <CharacterSearch
        onResults={mockOnResults}
        initialCharacters={initialCharacters}
        resultsCount={apiResults.length}
        searchSource="api"
      />
    );

    const searchInput = screen.getByPlaceholderText("Search a character...");
    fireEvent.change(searchInput, { target: { value: "Thor" } });

    await waitFor(() => {
      expect(getCharactersByName).toHaveBeenCalledWith("Thor");
      expect(mockOnResults).toHaveBeenCalledWith(apiResults);
    });
  });

  it("should search locally when searchSource is 'favorites'", async () => {
    render(
      <CharacterSearch
        onResults={mockOnResults}
        initialCharacters={initialCharacters}
        resultsCount={1}
        searchSource="favorites"
      />
    );

    const searchInput = screen.getByPlaceholderText("Search a character...");
    fireEvent.change(searchInput, { target: { value: "Spider" } });

    await waitFor(() => {
      expect(mockOnResults).toHaveBeenCalledWith([
        { id: "1", name: "Spider-Man", thumbnail: { path: "", extension: "" } },
      ]);
    });
  });

  it("should show the correct results count", async () => {
    const apiResults = [
      { id: "3", name: "Thor", thumbnail: { path: "", extension: "" } },
    ];
    (getCharactersByName as vi.Mock).mockResolvedValue(apiResults);

    render(
      <CharacterSearch
        onResults={mockOnResults}
        initialCharacters={initialCharacters}
        resultsCount={apiResults.length}
        searchSource="api"
      />
    );

    const searchInput = screen.getByPlaceholderText("Search a character...");
    fireEvent.change(searchInput, { target: { value: "Thor" } });

    await waitFor(() => {
      const resultsCount = screen.getByText("1");
      expect(resultsCount).toBeInTheDocument();
    });
  });
});
