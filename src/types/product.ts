export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  badge?: string;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
  collectionId?: string;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
}
