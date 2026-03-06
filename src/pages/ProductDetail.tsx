import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, Check, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useProduct } from "@/hooks/useProducts";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { data: product, isLoading } = useProduct(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
      if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const formatPrice = (price: number) => price.toLocaleString("fr-CD") + " FC";

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold">Produit non trouvé</h1>
            <Link to="/boutique">
              <Button variant="hero" className="mt-4">Retour à la boutique</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addItem(product, { size: selectedSize || undefined, color: selectedColor || undefined });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pb-20 pt-32">
        <div className="vsm-container">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Accueil</Link>
              <span>/</span>
              <Link to="/boutique" className="hover:text-primary">Boutique</Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-sm bg-secondary">
                <img src={images[selectedImage]} alt={product.name} className="h-full w-full object-cover" />
                {images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm hover:bg-background">
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm hover:bg-background">
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-sm bg-primary px-3 py-1 font-display text-sm font-bold text-primary-foreground">
                    {product.badge}
                  </span>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button key={index} onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 overflow-hidden rounded-sm border-2 transition-colors ${selectedImage === index ? "border-primary" : "border-transparent"}`}>
                      <img src={img} alt={`${product.name} ${index + 1}`} className="h-20 w-20 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
              <div>
                <p className="font-display text-sm uppercase tracking-[0.2em] text-primary">{product.category}</p>
                <h1 className="mt-2 font-display text-3xl font-bold uppercase md:text-4xl">{product.name}</h1>
              </div>
              <p className="text-lg text-muted-foreground">{product.description}</p>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="mb-3 font-display text-sm font-semibold uppercase">Taille</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button key={size} onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] rounded-sm border px-4 py-2 font-display text-sm font-medium transition-colors ${selectedSize === size ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="mb-3 font-display text-sm font-semibold uppercase">Couleur: <span className="text-primary">{selectedColor}</span></h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button key={color} onClick={() => setSelectedColor(color)}
                        className={`rounded-sm border px-4 py-2 text-sm font-medium transition-colors ${selectedColor === color ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button variant="hero" size="xl" className="w-full gap-2" onClick={handleAddToCart} disabled={!product.inStock}>
                {isAdded ? (<><Check className="h-5 w-5" />Ajouté au panier!</>) : (<><ShoppingCart className="h-5 w-5" />Ajouter au panier</>)}
              </Button>

              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm text-muted-foreground">{product.inStock ? "En stock" : "Rupture de stock"}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProductDetail;
