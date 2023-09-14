import { useContext } from "react";
import { FavoritesContext, FavoritesContextType } from "./context/FavoriteContext";

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}