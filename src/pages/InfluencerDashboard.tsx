import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MousePointer,
  ShoppingCart,
  Tag,
  TrendingUp,
  Copy,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const stats = [
  {
    label: "Clics sur votre lien",
    value: "1,234",
    icon: MousePointer,
    color: "text-blue-500",
  },
  {
    label: "Commandes générées",
    value: "45",
    icon: ShoppingCart,
    color: "text-green-500",
  },
  {
    label: "Taux de conversion",
    value: "3.6%",
    icon: TrendingUp,
    color: "text-primary",
  },
];

const InfluencerDashboard = () => {
  const influencerCode = "FASHION15";
  const influencerLink = `https://vsmcollection.com/?ref=${influencerCode}`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié!",
      description: `${type} copié dans le presse-papiers.`,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="vsm-container flex h-16 items-center justify-between">
          <h1 className="font-display text-xl font-bold">
            <span className="text-primary">VSM</span> Influenceur
          </h1>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" />
              Quitter
            </Button>
          </Link>
        </div>
      </header>

      <section className="vsm-section">
        <div className="vsm-container max-w-4xl">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
              Bienvenue
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase">
              @fashionkin
            </h2>
            <p className="mt-2 text-muted-foreground">
              Suivez vos performances et partagez votre code promo.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 grid gap-4 sm:grid-cols-3"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="vsm-card p-6 text-center">
                <stat.icon className={`mx-auto h-8 w-8 ${stat.color}`} />
                <p className="mt-4 font-display text-3xl font-bold">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Promo Code & Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Code */}
            <div className="vsm-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <Tag className="h-6 w-6 text-primary" />
                <h3 className="font-display text-lg font-semibold">
                  Votre code promo
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 rounded-sm bg-secondary px-4 py-3 font-display text-2xl font-bold tracking-wider text-primary">
                  {influencerCode}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(influencerCode, "Code")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                -15% pour vos followers
              </p>
            </div>

            {/* Link */}
            <div className="vsm-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <MousePointer className="h-6 w-6 text-primary" />
                <h3 className="font-display text-lg font-semibold">
                  Votre lien traçable
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 truncate rounded-sm bg-secondary px-4 py-3 text-sm text-muted-foreground">
                  {influencerLink}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(influencerLink, "Lien")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Partagez ce lien pour tracker vos visites
              </p>
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <div className="vsm-card p-6">
              <h3 className="font-display text-lg font-semibold">
                💡 Conseils pour maximiser vos ventes
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• Partagez votre code dans vos stories et bio</li>
                <li>• Montrez les produits en action dans vos posts</li>
                <li>• Rappelez régulièrement la réduction à vos followers</li>
                <li>• Utilisez votre lien traçable dans votre bio</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default InfluencerDashboard;
