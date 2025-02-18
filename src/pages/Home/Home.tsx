import { FC } from "react";

import { CharacterList } from "@components/CharacterList";
import { CharacterSearch } from "@components/CharacterSearch";
import { useCharacters } from "@hooks/useCharacters";

import "./home.scss";

export const Home: FC = () => {
  const { characters, setCharacters, initialCharacters } = useCharacters();

  return (
    <div className="home">
      <CharacterSearch
        onResults={setCharacters}
        initialCharacters={initialCharacters}
        resultsCount={characters.length}
      />
      <CharacterList characters={characters} />
    </div>
  );
};
