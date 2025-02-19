import { FC } from "react";

import { CharacterList } from "@components/CharacterList";
import { CharacterSearch } from "@components/CharacterSearch";
import { useCharacters } from "@hooks/useCharacters";

import "./home.scss";
import { Spinner } from "@components/Spinner";

export const Home: FC = () => {
  const { characters, setCharacters, initialCharacters, loading } =
    useCharacters();

  return (
    <div className="home">
      <CharacterSearch
        onResults={setCharacters}
        initialCharacters={initialCharacters}
        resultsCount={characters.length}
      />
      {loading ? <Spinner /> : <CharacterList characters={characters} />}
    </div>
  );
};
