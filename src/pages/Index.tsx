import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import BestSellers from "@/components/BestSellers";
import BrandValues from "@/components/BrandValues";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSlider />
      <BestSellers />
      <BrandValues />
      <Footer />
    </main>
  );
};

export default Index;
