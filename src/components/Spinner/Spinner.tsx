import { FC } from "react";
import "./spinner.scss";

interface SpinnerProps {
  text?: string;
}

export const Spinner: FC<SpinnerProps> = ({ text }) => {
  return (
    <div className="spinner-container" data-testid="spinner-container">
      {text && <p data-testid="spinner-text">{text}</p>}
      <div className="spinner" data-testid="spinner"></div>
    </div>
  );
};
