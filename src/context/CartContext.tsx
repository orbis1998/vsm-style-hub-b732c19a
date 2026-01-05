import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";

interface AddToCartOptions {
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, options?: AddToCartOptions) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  promoCode: string | null;
  promoDiscount: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getItemKey = (productId: string, size?: string, color?: string) => {
  return `${productId}-${size || ''}-${color || ''}`;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  const addItem = (product: Product, options?: AddToCartOptions) => {
    const size = options?.size;
    const color = options?.color;
    
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === size && item.color === color
      );
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1, size, color }];
    });
    
    toast({
      title: "Ajouté au panier",
      description: `${product.name}${size ? ` (${size})` : ''}${color ? ` - ${color}` : ''} a été ajouté à votre panier.`,
    });
  };

  const removeItem = (productId: string, size?: string, color?: string) => {
    setItems((prevItems) => 
      prevItems.filter((item) => 
        !(item.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeItem(productId, size, color);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
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
