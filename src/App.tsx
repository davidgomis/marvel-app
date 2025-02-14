import { Outlet } from "react-router-dom";

import { Header } from "@components/Header";

import "./App.scss";

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
