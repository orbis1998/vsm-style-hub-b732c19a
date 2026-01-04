import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  promoCode: string | null;
  promoDiscount: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
    setPromoDiscount(0);
  };

  const getTotal = () => {
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return subtotal - promoDiscount;
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const applyPromoCode = (code: string): boolean => {
    const promoCodes = [
      { code: "VSM10", discount: 10, type: "percent" as const },
      { code: "BIENVENUE", discount: 15, type: "percent" as const },
      { code: "FLASH5000", discount: 5000, type: "fixed" as const },
    ];

    const promo = promoCodes.find(
      (p) => p.code.toLowerCase() === code.toLowerCase()
    );

    if (promo) {
      const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const discount =
        promo.type === "percent"
          ? Math.floor((subtotal * promo.discount) / 100)
          : promo.discount;

      setPromoCode(promo.code);
      setPromoDiscount(discount);
      toast({
        title: "Code promo appliqué!",
        description: `Réduction de ${promo.type === "percent" ? promo.discount + "%" : promo.discount.toLocaleString() + " FC"}`,
      });
      return true;
    }

    toast({
      title: "Code invalide",
      description: "Ce code promo n'existe pas.",
      variant: "destructive",
    });
    return false;
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setPromoDiscount(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
        promoCode,
        promoDiscount,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
