import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/store";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", name: "Tout" },
  { id: "hoodies", name: "Hoodies" },
  { id: "t-shirts", name: "T-Shirts" },
  { id: "pantalons", name: "Pantalons" },
  { id: "vestes", name: "Vestes" },
  { id: "ensembles", name: "Ensembles" },
  { id: "accessoires", name: "Accessoires" },
];

const Boutique = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pb-12 pt-32 md:pt-40">
        <div className="vsm-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
              Collection 2024
            </p>
            <h1 className="mt-2 font-display text-5xl font-bold uppercase tracking-tight md:text-6xl">
              Boutique
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Explorez notre collection complète de streetwear premium. 
              Chaque pièce est conçue pour ceux qui vivent avec style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="border-b border-border pb-6">
        <div className="vsm-container">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="font-display"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="vsm-section">
        <div className="vsm-container">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">
                Aucun produit dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Boutique;
