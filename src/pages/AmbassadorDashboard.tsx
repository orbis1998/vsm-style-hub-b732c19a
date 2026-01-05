import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  MousePointer,
  ShoppingCart,
  TrendingUp,
  Copy,
  LogOut,
  Plus,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface TrackingLink {
  id: string;
  code: string;
  clicks: number;
  conversions: number;
  revenue: number;
  created_at: string;
}

interface PromoCode {
  id: string;
  code: string;
  discount_percent: number | null;
  discount_fixed: number | null;
  usage_count: number;
}

const AmbassadorDashboard = () => {
  const { user, signOut, isAmbassador, loading } = useAuth();
  const navigate = useNavigate();
  const [trackingLinks, setTrackingLinks] = useState<TrackingLink[]>([]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [newLinkCode, setNewLinkCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/connexion");
    } else if (!loading && user && !isAmbassador) {
      navigate("/");
      toast({
        title: "Accès refusé",
        description: "Vous n'êtes pas ambassadeur.",
        variant: "destructive",
      });
    }
  }, [user, loading, isAmbassador, navigate]);

  useEffect(() => {
    if (user && isAmbassador) {
      fetchData();
    }
  }, [user, isAmbassador]);

  const fetchData = async () => {
    if (!user) return;

    const [linksResult, codesResult] = await Promise.all([
      supabase
        .from("tracking_links")
        .select("*")
        .eq("ambassador_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("promo_codes")
        .select("*")
        .eq("ambassador_id", user.id),
    ]);

    if (linksResult.data) setTrackingLinks(linksResult.data);
    if (codesResult.data) setPromoCodes(codesResult.data);
  };

  const createTrackingLink = async () => {
    if (!newLinkCode.trim() || !user) return;

    setIsCreating(true);
    try {
      const { error } = await supabase.from("tracking_links").insert({
        ambassador_id: user.id,
        code: newLinkCode.toUpperCase().replace(/\s/g, ""),
      });

      if (error) throw error;

      toast({
        title: "Lien créé!",
        description: "Votre nouveau lien de tracking est prêt.",
      });
      setNewLinkCode("");
      fetchData();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer le lien.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié!",
      description: `${type} copié dans le presse-papiers.`,
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("fr-CD") + " FC";
  };

  const totalClicks = trackingLinks.reduce((sum, link) => sum + link.clicks, 0);
  const totalConversions = trackingLinks.reduce((sum, link) => sum + link.conversions, 0);
  const totalRevenue = trackingLinks.reduce((sum, link) => sum + link.revenue, 0);
  const conversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(1) : "0";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="vsm-container flex h-16 items-center justify-between">
          <h1 className="font-display text-xl font-bold">
            <span className="text-primary">VSM</span> Ambassadeur
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                Voir la boutique
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <section className="vsm-section">
        <div className="vsm-container max-w-5xl">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
              Tableau de bord
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase">
              Bienvenue, Ambassadeur
            </h2>
            <p className="mt-2 text-muted-foreground">
              Suivez vos performances et gérez vos liens de promotion.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="vsm-card p-6 text-center">
              <MousePointer className="mx-auto h-8 w-8 text-blue-500" />
              <p className="mt-4 font-display text-3xl font-bold">{totalClicks.toLocaleString()}</p>
              <p className="mt-1 text-sm text-muted-foreground">Clics totaux</p>
            </div>
            <div className="vsm-card p-6 text-center">
              <ShoppingCart className="mx-auto h-8 w-8 text-green-500" />
              <p className="mt-4 font-display text-3xl font-bold">{totalConversions}</p>
              <p className="mt-1 text-sm text-muted-foreground">Commandes</p>
            </div>
            <div className="vsm-card p-6 text-center">
              <TrendingUp className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-4 font-display text-3xl font-bold">{conversionRate}%</p>
              <p className="mt-1 text-sm text-muted-foreground">Taux de conversion</p>
            </div>
            <div className="vsm-card p-6 text-center">
              <DollarSign className="mx-auto h-8 w-8 text-yellow-500" />
              <p className="mt-4 font-display text-3xl font-bold">{formatPrice(totalRevenue)}</p>
              <p className="mt-1 text-sm text-muted-foreground">Revenus générés</p>
            </div>
          </motion.div>

          {/* Promo Codes */}
          {promoCodes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="mb-4 font-display text-xl font-bold">Vos codes promo</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {promoCodes.map((code) => (
                  <div key={code.id} className="vsm-card flex items-center justify-between p-4">
                    <div>
                      <p className="font-display text-xl font-bold text-primary">{code.code}</p>
                      <p className="text-sm text-muted-foreground">
                        {code.discount_percent
                          ? `-${code.discount_percent}%`
                          : code.discount_fixed
                          ? `-${formatPrice(code.discount_fixed)}`
                          : ""}
                        {" • "}{code.usage_count} utilisations
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(code.code, "Code promo")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tracking Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">Liens de tracking</h3>
            </div>

            {/* Create New Link */}
            <div className="vsm-card mb-6 p-4">
              <div className="flex gap-3">
                <Input
                  value={newLinkCode}
                  onChange={(e) => setNewLinkCode(e.target.value)}
                  placeholder="Code du lien (ex: SUMMER24)"
                  className="flex-1"
                />
                <Button
                  variant="default"
                  onClick={createTrackingLink}
                  disabled={!newLinkCode.trim() || isCreating}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Créer
                </Button>
              </div>
            </div>

            {/* Links List */}
            {trackingLinks.length > 0 ? (
              <div className="vsm-card overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-border bg-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Lien</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Clics</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Conversions</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">Revenus</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trackingLinks.map((link) => {
                      const fullLink = `https://vsmcollection.com/?ref=${link.code}`;
                      return (
                        <tr key={link.id} className="border-b border-border last:border-0">
                          <td className="px-4 py-4">
                            <p className="font-medium text-primary">{link.code}</p>
                            <p className="text-xs text-muted-foreground">{fullLink}</p>
                          </td>
                          <td className="px-4 py-4 text-center">{link.clicks}</td>
                          <td className="px-4 py-4 text-center">{link.conversions}</td>
                          <td className="px-4 py-4 text-right font-semibold text-green-500">
                            {formatPrice(link.revenue)}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(fullLink, "Lien")}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="vsm-card p-8 text-center">
                <MousePointer className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">
                  Créez votre premier lien de tracking pour commencer à suivre vos performances.
                </p>
              </div>
            )}
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <div className="vsm-card p-6">
              <h3 className="font-display text-lg font-semibold">
                💡 Conseils pour maximiser vos ventes
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• Partagez votre code promo dans vos stories et bio</li>
                <li>• Montrez les produits en action dans vos posts</li>
                <li>• Rappelez régulièrement la réduction à vos followers</li>
                <li>• Utilisez différents liens pour tracker vos campagnes</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AmbassadorDashboard;
