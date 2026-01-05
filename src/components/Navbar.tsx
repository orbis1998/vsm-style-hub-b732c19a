import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { name: "Accueil", path: "/" },
  { name: "Boutique", path: "/boutique" },
  { name: "À propos", path: "/a-propos" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCart();
  const { user, signOut, isAdmin, isAmbassador } = useAuth();
  const itemCount = getItemCount();

  const getDashboardLink = () => {
    if (isAdmin) return "/admin";
    if (isAmbassador) return "/ambassadeur";
    return "/mon-compte";
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <nav className="vsm-container flex h-16 items-center justify-between md:h-20">
        {/* Logo - Space reserved for logo upload */}
        <Link to="/" className="relative z-50">
          <div className="h-10 w-32 md:h-12 md:w-40">
            {/* Logo placeholder - will be replaced */}
            <h1 className="font-display text-2xl font-bold tracking-wider md:text-3xl">
              <span className="text-primary">VSM</span>
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display text-sm uppercase tracking-wider transition-colors duration-300 hover:text-primary ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link to="/panier" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link to={getDashboardLink()}>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Mon compte
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/connexion" className="hidden md:block">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Connexion
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="relative z-50 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-20 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 pt-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-display text-2xl uppercase tracking-wider ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {user ? (
                  <div className="flex flex-col items-center gap-4">
                    <Link to={getDashboardLink()} onClick={() => setIsOpen(false)}>
                      <Button variant="default" size="lg" className="gap-2">
                        <User className="h-5 w-5" />
                        Mon compte
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="gap-2"
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                      Déconnexion
                    </Button>
                  </div>
                ) : (
                  <Link to="/connexion" onClick={() => setIsOpen(false)}>
                    <Button variant="default" size="lg" className="mt-4 gap-2">
                      <User className="h-5 w-5" />
                      Connexion
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
