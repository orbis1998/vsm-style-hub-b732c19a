import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/data/store";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Fetch hero settings from DB, fallback to static
  const { data: dbSlides } = useQuery({
    queryKey: ["hero-slides-public"],
    queryFn: async () => {
      const { data } = await supabase.from("settings")
        .select("*")
        .in("key", [
          "hero_1_image", "hero_1_title", "hero_1_subtitle",
          "hero_2_image", "hero_2_title", "hero_2_subtitle",
          "hero_3_image", "hero_3_title", "hero_3_subtitle",
        ]);
      if (!data || data.length === 0) return null;
      const map: Record<string, string> = {};
      data.forEach(s => { map[s.key] = s.value || ""; });
      
      const slides: HeroSlide[] = [1, 2, 3].map((i) => ({
        id: i,
        image: map[`hero_${i}_image`] || heroSlides[i - 1]?.image || "",
        title: map[`hero_${i}_title`] || heroSlides[i - 1]?.title || "",
        subtitle: map[`hero_${i}_subtitle`] || heroSlides[i - 1]?.subtitle || "",
      })).filter(s => s.image || s.title);
      
      return slides.length > 0 ? slides : null;
    },
    staleTime: 5 * 60 * 1000,
  });

  const slides = dbSlides || heroSlides;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div key={currentSlide} custom={direction} variants={slideVariants}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slides[currentSlide].image})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="vsm-container relative z-10 flex h-full items-center">
        <div className="max-w-2xl space-y-6">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-4">
              <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
                {slides[currentSlide].subtitle}
              </p>
              <h2 className="font-display text-5xl font-bold uppercase tracking-tight md:text-7xl lg:text-8xl">
                {slides[currentSlide].title}
              </h2>
              <p className="max-w-md text-lg text-muted-foreground">
                Vivre avec style. Premium streetwear made in DRC, worn worldwide.
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-wrap gap-4 pt-4">
            <Link to="/boutique">
              <Button variant="hero" size="xl">Découvrir la collection</Button>
            </Link>
          </motion.div>
        </div>
      </div>


      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button key={index} onClick={() => { setDirection(index > currentSlide ? 1 : -1); setCurrentSlide(index); }}
            className={`h-2 transition-all duration-300 ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-foreground/30 hover:bg-foreground/50"}`} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="absolute bottom-8 right-8 hidden items-center gap-2 md:flex">
        <span className="font-display text-xs uppercase tracking-wider text-muted-foreground">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-6 w-[1px] bg-primary" />
      </motion.div>
    </section>
  );
};

export default HeroSlider;
