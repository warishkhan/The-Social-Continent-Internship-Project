import React, { createContext, useState, useEffect } from 'react';
import { fetchProducts } from '../utils/api';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      const productsWithFavorites = data.map((product) => ({
        ...product,
        isFavorite: false,
      }));
      setProducts(productsWithFavorites);
    };
    fetchData();
  }, []);

  const toggleFavorite = (productId) => {
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) return;

    const product = products[productIndex];
    const isCurrentlyFavorite = product.isFavorite;

    if (isCurrentlyFavorite) {
      const updatedFavorites = favorites.filter((item) => item.id !== productId);
      setFavorites(updatedFavorites);
    } else {
      let updatedFavorites;
      if (favorites.length < 5) {
        updatedFavorites = [...favorites, product];
      } else {
        updatedFavorites = [...favorites.slice(1), product];
      }
      setFavorites(updatedFavorites);
    }

    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, isFavorite: !isCurrentlyFavorite } : p
    );
    setProducts(updatedProducts);
  };

  return (
    <DataContext.Provider value={{ products, favorites, toggleFavorite }}>
      {children}
    </DataContext.Provider>
  );
};


