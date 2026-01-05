import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/store";
import { ArrowRight } from "lucide-react";

const BestSellers = forwardRef<HTMLElement>((_, ref) => {
  const bestSellers = products.slice(0, 4);

  return (
    <section ref={ref} className="vsm-section bg-background">
      <div className="vsm-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
            Best Sellers
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Best Layers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Découvrez nos pièces les plus demandées. Qualité premium, style intemporel.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/boutique">
            <Button variant="outline" size="lg" className="gap-2">
              Voir toute la collection
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

BestSellers.displayName = "BestSellers";

export default BestSellers;
