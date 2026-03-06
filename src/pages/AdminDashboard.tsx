import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Package, Users, DollarSign, Eye, ShoppingCart, TrendingUp, Plus, Edit, Trash2,
  LogOut, Menu, X, Tag, Truck, UserCheck, BarChart3, Save, Loader2, Check, XCircle, Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useAllProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

const menuItems = [
  { icon: BarChart3, label: "Dashboard", id: "dashboard" },
  { icon: Package, label: "Produits", id: "products" },
  { icon: ShoppingCart, label: "Commandes", id: "orders" },
  { icon: Truck, label: "Livraison", id: "delivery" },
  { icon: Tag, label: "Promos", id: "promos" },
  { icon: UserCheck, label: "Ambassadeurs", id: "ambassadors" },
  { icon: Users, label: "Clients", id: "clients" },
];

const formatPrice = (price: number) => price.toLocaleString("fr-CD") + " FC";

// =================== Product Form ===================
const ProductForm = ({ product, onClose }: { product?: Tables<"products"> | null; onClose: () => void }) => {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price ? String(product.price) : "",
    category: product?.category || "",
    image_url: product?.image_url || "",
    stock: product?.stock ? String(product.stock) : "0",
    sku: product?.sku || "",
    is_active: product?.is_active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      description: form.description || null,
      price: form.price ? Number(form.price) : null,
      category: form.category || null,
      image_url: form.image_url || null,
      stock: form.stock ? Number(form.stock) : 0,
      sku: form.sku || null,
      is_active: form.is_active,
    };

    try {
      if (product) {
        await updateProduct.mutateAsync({ id: product.id, ...payload });
        toast({ title: "Produit mis à jour" });
      } else {
        await createProduct.mutateAsync(payload);
        toast({ title: "Produit créé" });
      }
      onClose();
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    }
  };

  const isLoading = createProduct.isPending || updateProduct.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nom *</label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">SKU</label>
          <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Prix (FC)</label>
          <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Stock</label>
          <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Catégorie</label>
          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
            <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
            <SelectContent>
              {["hoodies", "t-shirts", "pantalons", "vestes", "ensembles", "accessoires"].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Actif</label>
          <Select value={form.is_active ? "true" : "false"} onValueChange={(v) => setForm({ ...form, is_active: v === "true" })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Oui</SelectItem>
              <SelectItem value="false">Non</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">URL Image</label>
        <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {product ? "Modifier" : "Créer"}
        </Button>
      </div>
    </form>
  );
};

// =================== Main Admin Dashboard ===================
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, signOut, loading: authLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editProduct, setEditProduct] = useState<Tables<"products"> | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const queryClient = useQueryClient();

  // Products
  const { data: products, isLoading: productsLoading } = useAllProducts();
  const deleteProduct = useDeleteProduct();

  // Orders
  const { data: orders } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*, profiles:customer_id(full_name, email)").order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Promo codes
  const { data: promoCodes } = useQuery({
    queryKey: ["admin-promos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("promo_codes").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Delivery zones
  const { data: deliveryZones } = useQuery({
    queryKey: ["admin-delivery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("delivery_zones").select("*").order("name");
      if (error) throw error;
      return data || [];
    },
  });

  // Ambassador applications
  const { data: ambassadorApps } = useQuery({
    queryKey: ["admin-ambassadors"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ambassador_applications").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Clients
  const { data: clients } = useQuery({
    queryKey: ["admin-clients"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Stats
  const totalRevenue = (orders || []).reduce((sum, o) => sum + Number(o.total_amount), 0);
  const totalOrders = (orders || []).length;
  const totalProducts = (products || []).length;
  const totalClients = (clients || []).length;

  const stats = [
    { label: "Produits", value: totalProducts, icon: Package, color: "text-blue-500" },
    { label: "Commandes", value: totalOrders, icon: ShoppingCart, color: "text-green-500" },
    { label: "Clients", value: totalClients, icon: Users, color: "text-primary" },
    { label: "Revenus", value: formatPrice(totalRevenue), icon: DollarSign, color: "text-yellow-500" },
  ];

  // Promo form state
  const [promoForm, setPromoForm] = useState({ code: "", discount_value: "", discount_type: "percent", description: "" });

  const handleCreatePromo = async () => {
    if (!promoForm.code || !promoForm.discount_value) return;
    const { error } = await supabase.from("promo_codes").insert({
      code: promoForm.code.toUpperCase(),
      discount_value: Number(promoForm.discount_value),
      discount_type: promoForm.discount_type,
      description: promoForm.description || null,
    });
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Code promo créé" });
    setPromoForm({ code: "", discount_value: "", discount_type: "percent", description: "" });
    queryClient.invalidateQueries({ queryKey: ["admin-promos"] });
  };

  // Delivery zone form
  const [dzForm, setDzForm] = useState({ name: "", city: "", price: "" });
  const handleCreateDZ = async () => {
    if (!dzForm.name) return;
    const { error } = await supabase.from("delivery_zones").insert({ name: dzForm.name, city: dzForm.city || null, price: dzForm.price ? Number(dzForm.price) : null });
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Zone créée" });
    setDzForm({ name: "", city: "", price: "" });
    queryClient.invalidateQueries({ queryKey: ["admin-delivery"] });
  };

  // Ambassador app status update
  const handleAppStatus = async (id: number, status: string) => {
    const { error } = await supabase.from("ambassador_applications").update({ status }).eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: `Candidature ${status === "approved" ? "approuvée" : "refusée"}` });
    queryClient.invalidateQueries({ queryKey: ["admin-ambassadors"] });
  };

  // Order status update
  const handleOrderStatus = async (id: number, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Statut mis à jour" });
    queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
  };

  if (authLoading) {
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold">Accès refusé</h1>
          <p className="mt-2 text-muted-foreground">Vous devez être administrateur.</p>
          <Link to="/"><Button variant="hero" className="mt-4">Retour</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <h1 className="font-display text-xl font-bold"><span className="text-primary">VSM</span> Admin</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X className="h-6 w-6" /></button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm font-medium transition-colors ${activeTab === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                  <item.icon className="h-5 w-5" />{item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
          <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { signOut(); navigate("/"); }}>
            <LogOut className="h-5 w-5" />Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <header className="flex h-16 items-center justify-between border-b border-border px-4 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu className="h-6 w-6" /></button>
          <h2 className="font-display text-lg font-semibold capitalize">{menuItems.find(m => m.id === activeTab)?.label || activeTab}</h2>
          <span className="text-sm text-muted-foreground">Admin VSM</span>
        </header>

        <div className="p-4 lg:p-8">
          {/* ============ DASHBOARD ============ */}
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="vsm-card p-6">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    <p className="mt-4 font-display text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => { setEditProduct(null); setShowProductForm(true); setActiveTab("products"); }}>
                  <Plus className="h-6 w-6 text-primary" />Ajouter un produit
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => setActiveTab("promos")}>
                  <Tag className="h-6 w-6 text-primary" />Créer une promo
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => setActiveTab("ambassadors")}>
                  <UserCheck className="h-6 w-6 text-primary" />Voir ambassadeurs
                </Button>
              </div>
            </motion.div>
          )}

          {/* ============ PRODUCTS ============ */}
          {activeTab === "products" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">Gestion des produits</h3>
                <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
                  <DialogTrigger asChild>
                    <Button className="gap-2" onClick={() => setEditProduct(null)}><Plus className="h-4 w-4" />Ajouter</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader><DialogTitle>{editProduct ? "Modifier le produit" : "Nouveau produit"}</DialogTitle></DialogHeader>
                    <ProductForm product={editProduct} onClose={() => setShowProductForm(false)} />
                  </DialogContent>
                </Dialog>
              </div>

              {productsLoading ? (
                <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
              ) : (
                <div className="vsm-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border bg-secondary">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Produit</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Catégorie</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Prix</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Statut</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(products || []).map((product) => (
                          <tr key={product.id} className="border-b border-border last:border-0">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                {product.image_url ? (
                                  <img src={product.image_url} alt={product.name} className="h-12 w-12 rounded-sm object-cover" />
                                ) : (
                                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-secondary"><Image className="h-5 w-5 text-muted-foreground" /></div>
                                )}
                                <span className="font-medium">{product.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 capitalize text-muted-foreground">{product.category || "—"}</td>
                            <td className="px-4 py-4 font-semibold text-primary">{product.price ? formatPrice(Number(product.price)) : "—"}</td>
                            <td className="px-4 py-4">{product.stock ?? 0}</td>
                            <td className="px-4 py-4">
                              <span className={`rounded-full px-2 py-1 text-xs font-medium ${product.is_active ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                                {product.is_active ? "Actif" : "Inactif"}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex justify-end gap-2">
                                <button className="rounded-sm p-2 hover:bg-secondary" onClick={() => { setEditProduct(product); setShowProductForm(true); }}>
                                  <Edit className="h-4 w-4 text-muted-foreground" />
                                </button>
                                <button className="rounded-sm p-2 hover:bg-destructive/20" onClick={async () => {
                                  if (confirm("Supprimer ce produit ?")) {
                                    try { await deleteProduct.mutateAsync(product.id); toast({ title: "Produit supprimé" }); } catch (err: any) { toast({ title: "Erreur", description: err.message, variant: "destructive" }); }
                                  }
                                }}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {(products || []).length === 0 && <p className="py-8 text-center text-muted-foreground">Aucun produit. Ajoutez-en un!</p>}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ============ ORDERS ============ */}
          {activeTab === "orders" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="font-display text-xl font-bold">Commandes</h3>
              <div className="vsm-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-secondary">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Client</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Statut</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(orders || []).map((order) => (
                        <tr key={order.id} className="border-b border-border last:border-0">
                          <td className="px-4 py-4 font-medium">#{order.id}</td>
                          <td className="px-4 py-4 text-muted-foreground">{(order as any).profiles?.full_name || (order as any).profiles?.email || "—"}</td>
                          <td className="px-4 py-4 font-semibold text-primary">{formatPrice(Number(order.total_amount))}</td>
                          <td className="px-4 py-4">
                            <Select value={order.status} onValueChange={(v) => handleOrderStatus(order.id, v)}>
                              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
                                  <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-4 py-4 text-sm text-muted-foreground">{order.created_at ? new Date(order.created_at).toLocaleDateString("fr-FR") : "—"}</td>
                          <td className="px-4 py-4 text-right">—</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(orders || []).length === 0 && <p className="py-8 text-center text-muted-foreground">Aucune commande.</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* ============ DELIVERY ============ */}
          {activeTab === "delivery" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="font-display text-xl font-bold">Zones de livraison</h3>
              <div className="vsm-card p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input placeholder="Nom de la zone" value={dzForm.name} onChange={(e) => setDzForm({ ...dzForm, name: e.target.value })} />
                  <Input placeholder="Ville" value={dzForm.city} onChange={(e) => setDzForm({ ...dzForm, city: e.target.value })} />
                  <div className="flex gap-2">
                    <Input placeholder="Prix (FC)" type="number" value={dzForm.price} onChange={(e) => setDzForm({ ...dzForm, price: e.target.value })} />
                    <Button onClick={handleCreateDZ}><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
              <div className="vsm-card overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-border bg-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Zone</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Ville</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Prix</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Actif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(deliveryZones || []).map((dz) => (
                      <tr key={dz.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-4 font-medium">{dz.name}</td>
                        <td className="px-4 py-4 text-muted-foreground">{dz.city || "—"}</td>
                        <td className="px-4 py-4">{dz.price ? formatPrice(Number(dz.price)) : "—"}</td>
                        <td className="px-4 py-4">{dz.is_active ? <Check className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(deliveryZones || []).length === 0 && <p className="py-8 text-center text-muted-foreground">Aucune zone.</p>}
              </div>
            </motion.div>
          )}

          {/* ============ PROMOS ============ */}
          {activeTab === "promos" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="font-display text-xl font-bold">Codes Promo</h3>
              <div className="vsm-card p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Input placeholder="Code (ex: VSM20)" value={promoForm.code} onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value })} />
                  <Input placeholder="Valeur" type="number" value={promoForm.discount_value} onChange={(e) => setPromoForm({ ...promoForm, discount_value: e.target.value })} />
                  <Select value={promoForm.discount_type} onValueChange={(v) => setPromoForm({ ...promoForm, discount_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percent">Pourcentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixe (FC)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleCreatePromo} className="gap-2"><Plus className="h-4 w-4" />Créer</Button>
                </div>
              </div>
              <div className="vsm-card overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-border bg-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Code</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Réduction</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Utilisations</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Actif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(promoCodes || []).map((promo) => (
                      <tr key={promo.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-4 font-medium text-primary">{promo.code}</td>
                        <td className="px-4 py-4">{promo.discount_type === "percent" ? `${promo.discount_value}%` : formatPrice(Number(promo.discount_value))}</td>
                        <td className="px-4 py-4">{promo.usage_count}{promo.max_usage ? `/${promo.max_usage}` : ""}</td>
                        <td className="px-4 py-4">{promo.active ? <Check className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(promoCodes || []).length === 0 && <p className="py-8 text-center text-muted-foreground">Aucun code promo.</p>}
              </div>
            </motion.div>
          )}

          {/* ============ AMBASSADORS ============ */}
          {activeTab === "ambassadors" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="font-display text-xl font-bold">Candidatures Ambassadeurs</h3>
              <div className="vsm-card overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-border bg-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Nom</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Plateforme</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Username</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Statut</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(ambassadorApps || []).map((app) => (
                      <tr key={app.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-4 font-medium">{app.full_name}</td>
                        <td className="px-4 py-4">{app.main_platform}</td>
                        <td className="px-4 py-4 text-primary">@{app.username}</td>
                        <td className="px-4 py-4">
                          <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                            app.status === "approved" ? "bg-green-500/20 text-green-500" :
                            app.status === "rejected" ? "bg-red-500/20 text-red-500" :
                            "bg-yellow-500/20 text-yellow-500"
                          }`}>{app.status}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            {app.status === "pending" && (
                              <>
                                <Button size="sm" variant="outline" className="text-green-500" onClick={() => handleAppStatus(app.id, "approved")}>
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-500" onClick={() => handleAppStatus(app.id, "rejected")}>
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(ambassadorApps || []).length === 0 && <p className="py-8 text-center text-muted-foreground">Aucune candidature.</p>}
              </div>
            </motion.div>
          )}

          {/* ============ CLIENTS ============ */}
          {activeTab === "clients" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="font-display text-xl font-bold">Clients</h3>
              <div className="vsm-card overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-border bg-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Nom</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Téléphone</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Rôle</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Inscription</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(clients || []).map((client) => (
                      <tr key={client.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-4 font-medium">{client.full_name || client.name || "—"}</td>
                        <td className="px-4 py-4 text-muted-foreground">{client.email || "—"}</td>
                        <td className="px-4 py-4">{client.phone || "—"}</td>
                        <td className="px-4 py-4"><span className="rounded-full bg-secondary px-2 py-1 text-xs">{client.role}</span></td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{client.created_at ? new Date(client.created_at).toLocaleDateString("fr-FR") : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(clients || []).length === 0 && <p className="py-8 text-center text-muted-foreground">Aucun client.</p>}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
