import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return price.toLocaleString("fr-CD") + " FC";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="vsm-card group"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute left-3 top-3">
            <span className="vsm-badge">{product.badge}</span>
          </div>
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-background/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            variant="cart"
            className="w-full gap-2"
            onClick={() => addItem(product)}
          >
            <ShoppingBag className="h-4 w-4" />
            Ajouter au panier
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 p-4">
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 pt-1">
          <span className="font-display text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="vsm-price-strike text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
