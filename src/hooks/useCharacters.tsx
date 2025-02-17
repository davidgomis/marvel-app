import { useState, useEffect } from "react";
import { CharacterProps, getCharacters } from "@api/marvelApi";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<CharacterProps[]>([]);
  const [initialCharacters, setInitialCharacters] = useState<CharacterProps[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setCharacters(data);
      setInitialCharacters(data);
    };

    fetchData();
  }, []);

  return { characters, setCharacters, initialCharacters };
};
