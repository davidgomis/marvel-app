import { getCharacterById } from "@api/characterService";
import { CharacterProps } from "@api/marvelApi";
import { CharacterList } from "@components/CharacterList";
import { CharacterSearch } from "@components/CharacterSearch";
import { useFavorites } from "@context/FavoritesContext";
import { useEffect, useState } from "react";

export const Favorites = () => {
  const { favorites } = useFavorites();
  const [favoriteCharacters, setFavoriteCharacters] = useState<
    CharacterProps[]
  >([]);
  const [filteredFavorites, setFilteredFavorites] = useState<CharacterProps[]>(
    []
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      const characterData = await Promise.all(
        favorites.map(async (id) => {
          const character = await getCharacterById(id);
          return character ? character : null;
        })
      );
      const characters = characterData.filter(Boolean) as CharacterProps[];
      setFavoriteCharacters(characters);
      setFilteredFavorites(characters);
    };

    if (favorites.length > 0) {
      fetchFavorites();
    } else {
      setFavoriteCharacters([]);
      setFilteredFavorites([]);
    }
  }, [favorites]);

  return (
    <div className="favorites">
      <h1>Favorites</h1>
      {favoriteCharacters.length > 0 && (
        <CharacterSearch
          onResults={setFilteredFavorites}
          initialCharacters={favoriteCharacters}
          resultsCount={filteredFavorites.length}
          searchSource="favorites"
        />
      )}
      {filteredFavorites.length > 0 ? (
        <CharacterList characters={filteredFavorites} />
      ) : (
        <p>No hay personajes favoritos.</p>
      )}
    </div>
  );
};
