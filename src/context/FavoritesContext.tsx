import { createContext, useContext, useState, ReactNode } from "react";

interface FavoritesContextProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter((fav) => fav !== id)
        : [...prevFavorites, id];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  }
  return context;
};
