import "./header.scss";
import logo from "../../assets/marvel_logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
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

export default Header;
