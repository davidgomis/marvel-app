import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./routers/router.tsx";
import { FavoritesProvider } from "@context/FavoritesContext.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  </StrictMode>
);
