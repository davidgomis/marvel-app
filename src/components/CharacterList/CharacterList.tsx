import { FC } from "react";

import { CharacterProps } from "@api/marvelApi";
import { Character } from "@components/Character";

import "./characterList.scss";

interface CharacterListProps {
  characters: CharacterProps[]; // Definir que characters es un array de CharacterProps
}

export const CharacterList: FC<CharacterListProps> = ({ characters }) => {
  return (
    <ul className="character-list">
      {characters.map((char) => (
        <Character
          key={`${char.id}-${char.name}`}
          id={char.id}
          name={char.name}
          thumbnail={char.thumbnail}
        />
      ))}
    </ul>
  );
};
