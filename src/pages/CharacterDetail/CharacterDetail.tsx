import { getCharacterById } from "@api/characterService";
import { CharacterDetailProps } from "@api/marvelApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterDetailProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getCharacterById(id);
      setCharacter(data || undefined);
      setLoading(false);
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!character) return <p>Character not found</p>;

  return (
    <div>
      <h1>{character.name}</h1>
    </div>
  );
};
