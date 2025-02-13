import { FC } from "react";
import logo from "@assets/marvel_logo.png";
import { useNavigate } from "react-router-dom";

import "./header.scss";

export const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <img
        src={logo}
        className="logo"
        alt="marvel logo"
        onClick={() => navigate("/")}
      />
    </div>
  );
};
