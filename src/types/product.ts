export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
