import { FC } from "react";

import { type CharacterProps } from "@api/marvelApi";
import { useFavorites } from "@context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import "./character.scss";

export const Character: FC<CharacterProps> = ({ id, thumbnail, name }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(id);
  return (
    <li className="character" key={id}>
      <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
      <div className="character__info">
        <span className="character__info__animation"></span>
        <p>{name}</p>
        {isFavorite ? (
          <FaHeart
            className="character__info__icon active"
            onClick={() => toggleFavorite(id)}
          />
        ) : (
          <FaRegHeart
            className="character__info__icon"
            onClick={() => toggleFavorite(id)}
          />
        )}

        <span className="character__info__corner"></span>
      </div>
    </li>
  );
};
