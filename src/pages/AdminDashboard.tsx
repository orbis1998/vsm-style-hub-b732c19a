import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Package,
  Users,
  DollarSign,
  Eye,
  ShoppingCart,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Menu,
  X,
  Tag,
  Truck,
  UserCheck,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/data/store";
import { Product } from "@/types/product";

const stats = [
  {
    label: "Vues totales",
    value: "12,450",
    change: "+12%",
    icon: Eye,
    color: "text-blue-500",
  },
  {
    label: "Clics produits",
    value: "3,287",
    change: "+8%",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    label: "Commandes",
    value: "156",
    change: "+23%",
    icon: ShoppingCart,
    color: "text-primary",
  },
  {
    label: "Revenus",
    value: "2.4M FC",
    change: "+18%",
    icon: DollarSign,
    color: "text-yellow-500",
  },
];

const menuItems = [
  { icon: BarChart3, label: "Dashboard", id: "dashboard" },
  { icon: Package, label: "Produits", id: "products" },
  { icon: ShoppingCart, label: "Commandes", id: "orders" },
  { icon: Truck, label: "Livraison", id: "delivery" },
  { icon: Tag, label: "Promos", id: "promos" },
  { icon: UserCheck, label: "Influenceurs", id: "influencers" },
  { icon: Users, label: "Clients", id: "clients" },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [productList, setProductList] = useState<Product[]>(products);

  const formatPrice = (price: number) => {
    return price.toLocaleString("fr-CD") + " FC";
  };

  const handleDeleteProduct = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <h1 className="font-display text-xl font-bold">
            <span className="text-primary">VSM</span> Admin
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogOut className="h-5 w-5" />
              Déconnexion
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="font-display text-lg font-semibold capitalize">
            {activeTab}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Admin VSM</span>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="vsm-card p-6"
                  >
                    <div className="flex items-center justify-between">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      <span className="text-sm font-medium text-green-500">
                        {stat.change}
                      </span>
                    </div>
                    <p className="mt-4 font-display text-2xl font-bold">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid gap-4 sm:grid-cols-3">
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2"
                  onClick={() => setActiveTab("products")}
                >
                  <Plus className="h-6 w-6 text-primary" />
                  Ajouter un produit
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2"
                  onClick={() => setActiveTab("promos")}
                >
                  <Tag className="h-6 w-6 text-primary" />
                  Créer une promo
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2"
                  onClick={() => setActiveTab("influencers")}
                >
                  <UserCheck className="h-6 w-6 text-primary" />
                  Ajouter influenceur
                </Button>
              </div>
            </motion.div>
          )}

          {activeTab === "products" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">
                  Gestion des produits
                </h3>
                <Button variant="default" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter
                </Button>
              </div>

              <div className="vsm-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-secondary">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Produit
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Catégorie
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Prix
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Stock
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-border last:border-0"
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-12 w-12 rounded-sm object-cover"
                              />
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 capitalize text-muted-foreground">
                            {product.category}
                          </td>
                          <td className="px-4 py-4 font-semibold text-primary">
                            {formatPrice(product.price)}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                product.inStock
                                  ? "bg-green-500/20 text-green-500"
                                  : "bg-red-500/20 text-red-500"
                              }`}
                            >
                              {product.inStock ? "En stock" : "Épuisé"}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex justify-end gap-2">
                              <button className="rounded-sm p-2 hover:bg-secondary">
                                <Edit className="h-4 w-4 text-muted-foreground" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="rounded-sm p-2 hover:bg-destructive/20"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "influencers" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">
                  Gestion des Influenceurs
                </h3>
                <Button variant="default" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nouvel influenceur
                </Button>
              </div>

              <div className="vsm-card p-6">
                <p className="text-muted-foreground">
                  Créez des liens traçables et des codes promo personnalisés pour
                  vos influenceurs. Suivez leurs performances en temps réel.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Nom de l'influenceur
                    </label>
                    <Input placeholder="@username" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Code promo</label>
                    <Input placeholder="INFLU20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Commission (%)</label>
                    <Input type="number" placeholder="10" />
                  </div>
                  <div className="flex items-end">
                    <Button variant="hero" className="w-full">
                      Créer le lien
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sample Influencer Stats */}
              <div className="vsm-card overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-border bg-secondary">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Influenceur
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Code
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Clics
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Commandes
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Revenus
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-4 py-4 font-medium">@fashionkin</td>
                      <td className="px-4 py-4 text-primary">FASHION15</td>
                      <td className="px-4 py-4">1,234</td>
                      <td className="px-4 py-4">45</td>
                      <td className="px-4 py-4 font-semibold text-green-500">
                        340,000 FC
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium">@streetstylerdc</td>
                      <td className="px-4 py-4 text-primary">STREET10</td>
                      <td className="px-4 py-4">876</td>
                      <td className="px-4 py-4">28</td>
                      <td className="px-4 py-4 font-semibold text-green-500">
                        215,000 FC
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Placeholder for other tabs */}
          {["orders", "delivery", "promos", "clients"].includes(activeTab) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="vsm-card flex min-h-[400px] items-center justify-center p-8"
            >
              <div className="text-center">
                <Package className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 font-display text-xl font-bold capitalize">
                  {activeTab}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Cette section sera disponible avec la connexion au backend.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
