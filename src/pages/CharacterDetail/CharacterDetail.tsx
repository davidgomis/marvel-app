import { useParams } from "react-router-dom";

import { useCharacter } from "@hooks/useCharacter";
import { Character } from "@components/Character";

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { character, loading } = useCharacter(id);

  if (loading) return <p>Loading...</p>;
  if (!character) return <p>Character not found</p>;

  return (
    <div>
      <Character
        id={character.id}
        name={character.name}
        thumbnail={character.thumbnail}
        description={
          character.description ?? "This character has no description"
        }
      />
    </div>
  );
};
