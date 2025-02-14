import { getCharacterById } from "@api/characterService";
import { CharacterProps } from "@api/marvelApi";
import { CharacterList } from "@components/CharacterList";
import { useFavorites } from "@context/FavoritesContext";
import { useEffect, useState } from "react";

export const Favorites = () => {
  const { favorites } = useFavorites();
  const [favoriteCharacters, setFavoriteCharacters] = useState<
    CharacterProps[]
  >([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const characterData = await Promise.all(
        favorites.map(async (id) => {
          const character = await getCharacterById(id);
          return character ? character : null;
        })
      );
      setFavoriteCharacters(characterData.filter(Boolean) as CharacterProps[]);
    };

    if (favorites.length > 0) {
      fetchFavorites();
    } else {
      setFavoriteCharacters([]);
    }
  }, [favorites]);
  return (
    <div className="favorites">
      <h1>Favorites</h1>
      {favoriteCharacters.length > 0 ? (
        <CharacterList characters={favoriteCharacters} />
      ) : (
        <p>No hay personajes favoritos.</p>
      )}
    </div>
  );
};
