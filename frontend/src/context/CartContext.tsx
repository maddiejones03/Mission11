import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types/CartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((previousCart) => {
      const existing = previousCart.find((c) => c.bookId === item.bookId);

      if (existing) {
        return previousCart.map((c) =>
          c.bookId === item.bookId
            ? { ...c, quantity: c.quantity + item.quantity }
            : c
        );
      }

      return [...previousCart, item];
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart((previousCart) => previousCart.filter((c) => c.bookId !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
