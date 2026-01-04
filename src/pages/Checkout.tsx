import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { provinces, kinshasaCommunes } from "@/data/store";
import { toast } from "@/hooks/use-toast";
import { Loader2, MessageCircle, Truck, MapPin } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotal, promoCode, promoDiscount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    province: "",
    city: "",
    commune: "",
    instructions: "",
    promoCode: "",
  });

  const isKinshasa = formData.province === "Kinshasa";

  const selectedCommune = useMemo(() => {
    if (isKinshasa && formData.commune) {
      return kinshasaCommunes.find((c) => c.name === formData.commune);
    }
    return null;
  }, [isKinshasa, formData.commune]);

  const deliveryFee = useMemo(() => {
    if (isKinshasa && selectedCommune) {
      return selectedCommune.deliveryFee;
    }
    return 0;
  }, [isKinshasa, selectedCommune]);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalWithDelivery = getTotal() + deliveryFee;

  const formatPrice = (price: number) => {
    return price.toLocaleString("fr-CD") + " FC";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.province) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    if (isKinshasa && !formData.commune) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner votre commune.",
        variant: "destructive",
      });
      return;
    }

    if (!isKinshasa && !formData.city) {
      toast({
        title: "Erreur",
        description: "Veuillez indiquer votre ville.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Build WhatsApp message
    const productList = items
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n");

    const locationInfo = isKinshasa
      ? `📍 Commune: ${formData.commune}, Kinshasa`
      : `📍 ${formData.city}, ${formData.province}`;

    const deliveryInfo = isKinshasa
      ? `🚚 Frais de livraison: ${formatPrice(deliveryFee)}`
      : `🚚 Livraison via agence partenaire`;

    const message = encodeURIComponent(
      `🛍️ *NOUVELLE COMMANDE VSM COLLECTION*\n\n` +
        `👤 *Client:* ${formData.fullName}\n` +
        `📞 *Téléphone:* ${formData.phone}\n` +
        `${locationInfo}\n` +
        `${formData.instructions ? `📝 Instructions: ${formData.instructions}\n` : ""}` +
        `\n📦 *ARTICLES:*\n${productList}\n\n` +
        `💰 Sous-total: ${formatPrice(subtotal)}\n` +
        `${promoDiscount > 0 ? `🏷️ Réduction (${promoCode}): -${formatPrice(promoDiscount)}\n` : ""}` +
        `${deliveryInfo}\n` +
        `\n💵 *TOTAL: ${formatPrice(totalWithDelivery)}*\n\n` +
        `Merci pour votre commande! 🙏`
    );

    // Redirect to WhatsApp
    const whatsappNumber = "243000000000"; // Replace with actual number
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

    clearCart();
    setIsSubmitting(false);
    
    toast({
      title: "Commande envoyée!",
      description: "Vous allez être redirigé vers WhatsApp.",
    });

    navigate("/");
  };

  if (items.length === 0) {
    navigate("/panier");
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pb-20 pt-32">
        <div className="vsm-container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl"
          >
            Finaliser la commande
          </motion.h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="lg:col-span-2"
            >
              <div className="vsm-card space-y-6 p-6">
                <h2 className="font-display text-xl font-bold uppercase">
                  Informations de livraison
                </h2>

                {/* Personal Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Nom complet *
                    </label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Numéro de téléphone *
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+243 ..."
                      required
                    />
                  </div>
                </div>

                {/* Province */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Province *
                  </label>
                  <Select
                    value={formData.province}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        province: value,
                        commune: "",
                        city: "",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Kinshasa Commune or City */}
                {isKinshasa ? (
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Commune *
                    </label>
                    <Select
                      value={formData.commune}
                      onValueChange={(value) =>
                        setFormData({ ...formData, commune: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre commune" />
                      </SelectTrigger>
                      <SelectContent>
                        {kinshasaCommunes.map((commune) => (
                          <SelectItem key={commune.name} value={commune.name}>
                            {commune.name} - {formatPrice(commune.deliveryFee)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {selectedCommune && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 flex items-center gap-2 rounded-sm bg-primary/10 p-3"
                      >
                        <Truck className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          Frais de livraison:{" "}
                          <span className="font-semibold text-primary">
                            {formatPrice(selectedCommune.deliveryFee)}
                          </span>
                        </span>
                      </motion.div>
                    )}
                  </div>
                ) : formData.province ? (
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Ville *
                    </label>
                    <Input
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Votre ville"
                      required
                    />
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 flex items-start gap-2 rounded-sm bg-secondary p-3"
                    >
                      <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        La livraison sera effectuée via une agence partenaire de
                        votre province. Votre commande est validée et expédiée.
                      </p>
                    </motion.div>
                  </div>
                ) : null}

                {/* Instructions */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Instructions de livraison (optionnel)
                  </label>
                  <Textarea
                    value={formData.instructions}
                    onChange={(e) =>
                      setFormData({ ...formData, instructions: e.target.value })
                    }
                    placeholder="Point de repère, horaires préférés..."
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-5 w-5" />
                      Commander via WhatsApp
                    </>
                  )}
                </Button>
              </div>
            </motion.form>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              <div className="vsm-card p-6">
                <h2 className="font-display text-xl font-bold uppercase">
                  Votre commande
                </h2>

                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-sm object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          x{item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Réduction ({promoCode})
                      </span>
                      <span className="text-primary">
                        -{formatPrice(promoDiscount)}
                      </span>
                    </div>
                  )}

                  {isKinshasa && deliveryFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livraison</span>
                      <span>{formatPrice(deliveryFee)}</span>
                    </div>
                  )}

                  {!isKinshasa && formData.province && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="text-muted-foreground">Via agence</span>
                    </div>
                  )}

                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="font-display text-lg font-semibold">
                      Total
                    </span>
                    <span className="font-display text-xl font-bold text-primary">
                      {formatPrice(totalWithDelivery)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Checkout;
