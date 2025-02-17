import { FC, MouseEvent } from "react";

import { type CharacterProps } from "@api/marvelApi";
import { useFavorites } from "@context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import "./character.scss";
import { Link } from "react-router-dom";

export const Character: FC<CharacterProps> = ({ id, thumbnail, name }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(id);

  const handleFavoriteClick = (e: MouseEvent) => {
    e.preventDefault(); // Evita la navegación del link
    e.stopPropagation(); // Evita que el evento se propague
    toggleFavorite(id);
  };
  return (
    <li className="character" key={id}>
      <Link to={`/characterDetail/${id}`} className="character__link">
        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
        <div className="character__info">
          <span className="character__info__animation"></span>
          <p>{name}</p>
          {isFavorite ? (
            <FaHeart
              className="character__info__icon active"
              onClick={handleFavoriteClick}
            />
          ) : (
            <FaRegHeart
              className="character__info__icon"
              onClick={handleFavoriteClick}
            />
          )}

          <span className="character__info__corner"></span>
        </div>
      </Link>
    </li>
  );
};
