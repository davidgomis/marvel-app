import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Importa MemoryRouter
import { Character } from "./Character"; // Asegúrate de que la ruta sea correcta
import { FavoritesProvider, useFavorites } from "@context/FavoritesContext"; // Asegúrate de que la ruta sea correcta
import { vi } from "vitest";

// Mockear el contexto FavoritesContext
vi.mock("@context/FavoritesContext", () => ({
  useFavorites: vi.fn(),
  FavoritesProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("Character Component", () => {
  it("should render the component in the document", () => {
    // Mockear los valores del contexto
    const mockFavorites = ["1"];
    const mockToggleFavorite = vi.fn();

    // Configurar el mock de useFavorites para devolver los valores mockeados
    (useFavorites as vi.Mock).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite: mockToggleFavorite,
    });

    // Renderizar el componente con el contexto mockeado y MemoryRouter
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

    // Verificar que el componente esté en el documento
    const characterElement = screen.getByText("Spider-Man");
    expect(characterElement).toBeInTheDocument();
  });

  it("should render the description if it is provided", () => {
    // Mockear los valores del contexto
    const mockFavorites = ["1"];
    const mockToggleFavorite = vi.fn();

    // Configurar el mock de useFavorites para devolver los valores mockeados
    (useFavorites as vi.Mock).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite: mockToggleFavorite,
    });

    // Renderizar el componente con la prop description
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <Character
            id="1"
            name="Spider-Man"
            thumbnail={{ path: "http://example.com/image", extension: "jpg" }}
            description="This is a test description"
          />
        </FavoritesProvider>
      </MemoryRouter>
    );

    // Verificar que la descripción se renderice correctamente
    const descriptionElement = screen.getByText("This is a test description");
    expect(descriptionElement).toBeInTheDocument();
  });

  it("should render the filled heart icon if the character is a favorite", () => {
    // Mockear los valores del contexto
    const mockFavorites = ["1"]; // El personaje con id "1" es favorito
    const mockToggleFavorite = vi.fn();

    // Configurar el mock de useFavorites para devolver los valores mockeados
    (useFavorites as vi.Mock).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite: mockToggleFavorite,
    });

    // Renderizar el componente con el contexto mockeado y MemoryRouter
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

    // Verificar que el ícono de corazón lleno (FaHeart) esté en el documento
    const filledHeartIcon = screen.getByTestId("filled-heart-icon");
    expect(filledHeartIcon).toBeInTheDocument();
    expect(filledHeartIcon).toHaveClass("active"); // Verificar que tiene la clase "active"
  });

  it("should render the outlined heart icon if the character is not a favorite", () => {
    // Mockear los valores del contexto
    const mockFavorites = ["2"]; // El personaje con id "1" NO es favorito
    const mockToggleFavorite = vi.fn();

    // Configurar el mock de useFavorites para devolver los valores mockeados
    (useFavorites as vi.Mock).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite: mockToggleFavorite,
    });

    // Renderizar el componente con el contexto mockeado y MemoryRouter
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

    // Verificar que el ícono de corazón vacío (FaRegHeart) esté en el documento
    const outlinedHeartIcon = screen.getByTestId("outlined-heart-icon");
    expect(outlinedHeartIcon).toBeInTheDocument();
    expect(outlinedHeartIcon).not.toHaveClass("active"); // Verificar que NO tiene la clase "active"
  });
});
