import { CharacterList } from "@components/CharacterList";
import { CharacterSearch } from "@components/CharacterSearch";
import { useFavoriteCharacters } from "@hooks/useFavoriteCharacters";

import "./favorites.scss";
import { Spinner } from "@components/Spinner";

export const Favorites = () => {
  const {
    favoriteCharacters,
    filteredFavorites,
    setFilteredFavorites,
    loading,
  } = useFavoriteCharacters();

  return (
    <div className="favorites">
      <h1>Favorites</h1>
      {loading && <Spinner />}
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
