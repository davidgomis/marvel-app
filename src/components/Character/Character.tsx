import { FC, MouseEvent } from "react";

import { type CharacterProps } from "@api/marvelApi";
import { useFavorites } from "@context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import "./character.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";

export const Character: FC<CharacterProps> = ({
  id,
  thumbnail,
  name,
  description,
  isDetail,
}) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(id);

  const handleFavoriteClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };
  return (
    <li
      className={classNames("character", { "character-alter": isDetail })}
      key={id}
    >
      <Link to={`/characterDetail/${id}`} className="character__link">
        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
        <div className="character__info">
          <div className="character__info__header">
            <span className="character__info__animation"></span>
            <p>{name}</p>
            {isFavorite ? (
              <FaHeart
                className="character__info__icon active"
                onClick={handleFavoriteClick}
                data-testid="filled-heart-icon"
                size={description ? 24 : 16}
              />
            ) : (
              <FaRegHeart
                className="character__info__icon"
                onClick={handleFavoriteClick}
                data-testid="outlined-heart-icon"
                size={description ? 24 : 16}
              />
            )}
          </div>
          <span className="character__info__corner"></span>

          {isDetail && (
            <p className="character__info__description">
              {description && description.trim() !== ""
                ? description
                : "This character does not have a description available, but we invite you to explore more about his history and appearances in the comics."}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
};
