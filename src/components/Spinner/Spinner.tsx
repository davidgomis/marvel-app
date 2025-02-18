import { FC } from "react";
import "./spinner.scss";

interface SpinnerProps {
  text?: string;
}

export const Spinner: FC<SpinnerProps> = ({ text }) => {
  return (
    <div className="spinner-container">
      {text && <p>{text}</p>}
      <div className="spinner"></div>
    </div>
  );
};
