import { FC, useEffect, useState } from "react";

import { CharacterProps, getCharacters } from "@api/marvelApi";
import { CharacterList } from "@components/CharacterList";

import "./home.scss";

export const Home: FC = () => {
  const [characters, setCharacters] = useState<CharacterProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setCharacters(data);
    };
    fetchData();
  }, []);
  return (
    <div className="home">
      <CharacterList characters={characters} />
    </div>
  );
};
