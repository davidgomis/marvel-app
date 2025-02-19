import { useState, useEffect } from "react";
import { CharacterProps, getCharacters } from "@api/marvelApi";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<CharacterProps[]>([]);
  const [initialCharacters, setInitialCharacters] = useState<CharacterProps[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharacters();
        setCharacters(data);
        setInitialCharacters(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { characters, setCharacters, initialCharacters, loading };
};
