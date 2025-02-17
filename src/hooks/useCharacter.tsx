import { useState, useEffect } from "react";
import { getCharacterById } from "@api/characterService";
import { CharacterDetailProps } from "@api/marvelApi";

export const useCharacter = (id?: string) => {
  const [character, setCharacter] = useState<CharacterDetailProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getCharacterById(id);
      setCharacter(data);
      setLoading(false);
    };

    fetchCharacter();
  }, [id]);

  return { character, loading };
};
