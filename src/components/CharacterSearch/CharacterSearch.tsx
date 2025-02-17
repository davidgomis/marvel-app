import { FC, useEffect, useState } from "react";
import { debounce } from "lodash";
import { IoIosSearch } from "react-icons/io";

import { CharacterProps } from "@api/marvelApi";
import { getCharactersByName } from "@api/characterService";

import "./characterSearch.scss";

interface CharacterSearchProps {
  onResults: (results: CharacterProps[]) => void;
  initialCharacters: CharacterProps[];
  resultsCount: number;
  searchSource?: "api" | "favorites";
}

export const CharacterSearch: FC<CharacterSearchProps> = ({
  onResults,
  initialCharacters,
  resultsCount,
  searchSource = "api",
}) => {
  const [searchText, setSearchText] = useState("");

  const fetchCharacters = debounce(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      onResults(initialCharacters);
      return;
    }

    if (searchSource === "api") {
      const results = await getCharactersByName(searchTerm);
      onResults(results);
    } else {
      const filteredFavorites = initialCharacters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      onResults(filteredFavorites);
    }
  }, 500);

  useEffect(() => {
    fetchCharacters(searchText);
    return () => fetchCharacters.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, initialCharacters, searchSource]);

  return (
    <div className="character-search">
      <div className="character-search__input">
        <IoIosSearch size={16} />
        <input
          type="text"
          placeholder="Search a character..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="character-search__count">
        <span>{resultsCount}</span>
        <p>{resultsCount === 1 ? "result" : "results"}</p>
      </div>
    </div>
  );
};
