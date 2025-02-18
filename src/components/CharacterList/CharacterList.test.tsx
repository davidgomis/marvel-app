import { render, screen } from "@testing-library/react";
import { CharacterList } from "./CharacterList";

import { vi } from "vitest";

vi.mock("@components/Character", () => ({
  Character: vi.fn(() => <div>Mocked Character</div>),
}));

describe("CharacterList Component", () => {
  const mockCharacters = [
    {
      id: "1",
      name: "Spider-Man",
      thumbnail: { path: "http://example.com/spiderman", extension: "jpg" },
    },
    {
      id: "2",
      name: "Iron Man",
      thumbnail: { path: "http://example.com/ironman", extension: "jpg" },
    },
  ];

  it("should render a list of characters", () => {
    render(<CharacterList characters={mockCharacters} />);

    const characterElements = screen.getAllByText("Mocked Character");
    expect(characterElements).toHaveLength(mockCharacters.length);
  });
});
