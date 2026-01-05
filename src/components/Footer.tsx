import { forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
} from "lucide-react";

const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "https://facebook.com/vsmcollection" },
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/vsmcollection" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/vsmcollection" },
];

const Footer = forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer ref={ref} className="border-t border-border bg-card">
      <div className="vsm-container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold">
              <span className="text-primary">VSM</span> Collection
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Made in DRC, Worn Worldwide. Premium streetwear pour une génération qui vit avec style.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-secondary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold uppercase tracking-wider">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Accueil
              </Link>
              <Link
                to="/boutique"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Boutique
              </Link>
              <Link
                to="/a-propos"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                À propos
              </Link>
              <Link
                to="/contact"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Boutique */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold uppercase tracking-wider">
              Boutique
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                to="/boutique?cat=hoodies"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Hoodies
              </Link>
              <Link
                to="/boutique?cat=t-shirts"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                T-Shirts
              </Link>
              <Link
                to="/boutique?cat=pantalons"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Pantalons
              </Link>
              <Link
                to="/boutique?cat=accessoires"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Accessoires
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+243000000000"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" />
                +243 000 000 000
              </a>
              <a
                href="mailto:contact@vsmcollection.com"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                contact@vsmcollection.com
              </a>
              <p className="text-sm text-muted-foreground">
                📍 Ngiri-Ngiri, Kinshasa, RDC
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 VSM Collection. Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ in DRC
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
