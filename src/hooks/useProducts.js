import { useState, useEffect, useMemo } from "react";
import { INITIAL_PRODUCTS } from "../constants/initialProducts";

export const EMPTY_FORM = { name: "", category: "", price: "", stock: "", description: "", image: "" };

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80";

// Encapsulates product data: persisted state, derived stats, and create/update/delete actions.
export function useProducts() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const stats = useMemo(
    () => ({
      total: products.length,
      stock: products.reduce((sum, p) => sum + p.stock, 0),
      low: products.filter((p) => p.stock > 0 && p.stock <= 10).length,
      out: products.filter((p) => p.stock === 0).length,
    }),
    [products]
  );

  const addProduct = (form) => {
    const newProduct = {
      id: Date.now(),
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description.trim(),
      image: form.image || FALLBACK_IMAGE,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id, form) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              name: form.name.trim(),
              category: form.category,
              price: Number(form.price),
              stock: Number(form.stock),
              description: form.description.trim(),
              image: form.image || p.image,
            }
          : p
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return { products, stats, addProduct, updateProduct, deleteProduct };
}
