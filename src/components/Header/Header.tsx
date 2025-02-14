import { FC } from "react";
import logo from "@assets/marvel_logo.png";
import { Link, useNavigate } from "react-router-dom";

import "./header.scss";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "@context/FavoritesContext";

export const Header: FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  return (
    <div className="header">
      <img
        src={logo}
        className="logo"
        alt="marvel logo"
        onClick={() => navigate("/")}
      />
      <Link to="/favorites" className="header__favorites">
        <FaHeart className="favorite-icon" size={24} />
        <span className="favorite-count">{favorites.length}</span>
      </Link>
    </div>
  );
};
