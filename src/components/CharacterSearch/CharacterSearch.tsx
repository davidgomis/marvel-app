import { FC, useCallback, useEffect, useState } from "react";

import { CharacterProps } from "@api/marvelApi";
import { getCharactersByName } from "@api/characterService";

import { debounce } from "lodash";
import { IoIosSearch } from "react-icons/io";

import "./characterSearch.scss";

interface CharacterSearchProps {
  onResults: (results: CharacterProps[]) => void;
  initialCharacters: CharacterProps[];
  resultsCount: number;
}

export const CharacterSearch: FC<CharacterSearchProps> = ({
  onResults,
  initialCharacters,
  resultsCount,
}) => {
  const [searchText, setSearchText] = useState("");

  const fetchCharacters = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm) {
        onResults(initialCharacters);
        return;
      }

      const results = await getCharactersByName(searchTerm);
      onResults(results);
    }, 500),
    [initialCharacters]
  );

  useEffect(() => {
    if (searchText) {
      fetchCharacters(searchText);
    } else {
      onResults(initialCharacters);
    }
  }, [searchText, initialCharacters, fetchCharacters, onResults]);

  return (
    <div className="character-search">
      <div className="character-search__input">
        <IoIosSearch size={16} />
        <input
          type="text"
          placeholder="Search a character..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className=""
        />
      </div>
      <div className="character-search__count">
        <span>{resultsCount}</span>
        <p>{resultsCount > 0 ? "results" : "result"}</p>
      </div>
    </div>
  );
};
