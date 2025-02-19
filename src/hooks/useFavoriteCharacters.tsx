import { useState, useEffect } from "react";

import { CharacterProps, getCharacterById } from "@api/marvelApi";
import { useFavorites } from "@context/FavoritesContext";

export const useFavoriteCharacters = () => {
  const { favorites } = useFavorites();
  const [favoriteCharacters, setFavoriteCharacters] = useState<
    CharacterProps[]
  >([]);
  const [filteredFavorites, setFilteredFavorites] = useState<CharacterProps[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const characterData = await Promise.all(
        favorites.map(async (id) => {
          const character = await getCharacterById(id);
          return character ? character : null;
        })
      );
      const characters = characterData.filter(Boolean) as CharacterProps[];
      setFavoriteCharacters(characters);
      setFilteredFavorites(characters);
      setLoading(false);
    };

    if (favorites.length > 0) {
      fetchFavorites();
    } else {
      setFavoriteCharacters([]);
      setFilteredFavorites([]);
    }
  }, [favorites]);

  return {
    favoriteCharacters,
    filteredFavorites,
    setFilteredFavorites,
    loading,
  };
};
