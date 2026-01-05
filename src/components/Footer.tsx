import { forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
} from "lucide-react";

// Custom icons for platforms not in lucide
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SnapchatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.12-.063-.18-.016-.24.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-.732-.283-1.137-.615-1.196-.975-.03-.164.015-.344.119-.494.18-.271.569-.405.885-.405.135 0 .255.015.359.045.38.09.734.226 1.049.315.195.089.375.119.54.119.209 0 .359-.045.435-.09-.03-.149-.045-.315-.06-.494-.015-.044-.015-.088-.015-.12-.112-1.661-.24-3.73.301-4.922 1.568-3.561 4.94-3.836 5.928-3.836h.183z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 0C5.372 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "https://facebook.com/vsmcollection" },
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/vsmcollection" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/vsmcollection" },
  { name: "TikTok", icon: TikTokIcon, url: "https://tiktok.com/@vsmcollection" },
  { name: "Snapchat", icon: SnapchatIcon, url: "https://snapchat.com/add/vsmcollection" },
  { name: "Pinterest", icon: PinterestIcon, url: "https://pinterest.com/vsmcollection" },
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
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-secondary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  title={social.name}
                >
                  <social.icon />
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
              <Link
                to="/devenir-ambassadeur"
                className="text-sm font-medium text-primary transition-colors hover:underline"
              >
                Devenir Ambassadeur
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
                href="tel:+243976028479"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" />
                +243 97 60 28 479
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
