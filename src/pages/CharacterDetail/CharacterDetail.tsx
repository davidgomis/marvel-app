import { useParams } from "react-router-dom";

import { useCharacter } from "@hooks/useCharacter";

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { character, loading } = useCharacter(id);

  if (loading) return <p>Loading...</p>;
  if (!character) return <p>Character not found</p>;

  return (
    <div>
      <h1>{character.name}</h1>
    </div>
  );
};
