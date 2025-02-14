import { FC } from "react";

import { type CharacterProps } from "@api/marvelApi";

import "./character.scss";

export const Character: FC<CharacterProps> = ({ id, thumbnail, name }) => {
  return (
    <li className="character" key={id}>
      <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
      <div className="character__info">
        <span className="character__info__animation"></span>
        <p>{name}</p>
        <span className="character__info__corner"></span>
      </div>
    </li>
  );
};
