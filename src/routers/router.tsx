import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { Home } from "@pages/Home";
import { Favorites } from "@pages/Favorites/Favorites";
import { CharacterDetail } from "@pages/CharacterDetail/CharacterDetail";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "favorites", element: <Favorites /> },
      { path: "characterDetail/:id", element: <CharacterDetail /> },
    ],
  },
]);

export default router;
