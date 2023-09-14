import React, { createContext,  useState } from "react";


export interface FavoritesContextType {
  favorites: string[];
  addFavorite: (favorite: string) => void;
  removeFavorite: (favorite: string) => void;
  clearFavorites: () => void;
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export default function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (favorite: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, favorite]);
  };

  const removeFavorite = (favorite: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((f) => f !== favorite));
  };

  const clearFavorites = () => {
    setFavorites([]);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

