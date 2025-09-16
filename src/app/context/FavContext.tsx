"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface FavoriteContextType {
  favorites: Product[];
  addToFav: (product: Product) => void;
  removeFromFav: (productId: number) => void;
  clearFav: () => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  function addToFav(product: Product) {
    const exists = favorites.some((p) => p.id === product.id);
    if (!exists) {
      setFavorites((prev) => [...prev, product]);
    }
  }

  function removeFromFav(productId: number) {
    setFavorites((prev) => prev.filter((p) => p.id !== productId));
  }

  function clearFav() {
    setFavorites([]);
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addToFav,
        removeFromFav,
        clearFav,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFav = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFav must be used within FavProvider");
  }
  return context;
};
