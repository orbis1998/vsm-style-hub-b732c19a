import { Product } from "@/types/product";

// Product images - to be replaced with real images
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

export const heroSlides = [
  {
    id: 1,
    image: hero1,
    title: "Nouvelle Collection",
    subtitle: "Automne / Hiver 2024",
  },
  {
    id: 2,
    image: hero2,
    title: "Style Urbain",
    subtitle: "Made in DRC, Worn Worldwide",
  },
  {
    id: 3,
    image: hero3,
    title: "Édition Limitée",
    subtitle: "Découvrez l'exclusivité VSM",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "VSM Classic Hoodie",
    description: "Hoodie premium en coton bio, coupe oversize",
    price: 89000,
    originalPrice: 120000,
    image: hero1,
    category: "hoodies",
    badge: "-26%",
    inStock: true,
  },
  {
    id: "2",
    name: "VSM Tracksuit Red Line",
    description: "Ensemble survêtement avec bandes signature VSM",
    price: 145000,
    image: hero2,
    category: "ensembles",
    inStock: true,
  },
  {
    id: "3",
    name: "VSM Urban Tee",
    description: "T-shirt streetwear avec logo brodé",
    price: 45000,
    originalPrice: 55000,
    image: hero3,
    category: "t-shirts",
    badge: "-18%",
    inStock: true,
  },
  {
    id: "4",
    name: "VSM Cargo Pants",
    description: "Pantalon cargo coupe relaxed, multi-poches",
    price: 78000,
    image: hero1,
    category: "pantalons",
    inStock: true,
  },
  {
    id: "5",
    name: "VSM Cap Elite",
    description: "Casquette brodée édition limitée",
    price: 35000,
    originalPrice: 45000,
    image: hero2,
    category: "accessoires",
    badge: "-22%",
    inStock: true,
  },
  {
    id: "6",
    name: "VSM Bomber Jacket",
    description: "Veste bomber premium, finitions luxe",
    price: 195000,
    image: hero3,
    category: "vestes",
    badge: "NEW",
    inStock: true,
  },
];

// Kinshasa communes with delivery zones based on distance from Ngiri-Ngiri
export const kinshasaCommunes: { name: string; zone: "proche" | "moyenne" | "eloignee"; deliveryFee: number }[] = [
  { name: "Ngiri-Ngiri", zone: "proche", deliveryFee: 2000 },
  { name: "Kalamu", zone: "proche", deliveryFee: 3000 },
  { name: "Kasa-Vubu", zone: "proche", deliveryFee: 3000 },
  { name: "Bumbu", zone: "proche", deliveryFee: 3500 },
  { name: "Makala", zone: "proche", deliveryFee: 4000 },
  { name: "Selembao", zone: "moyenne", deliveryFee: 5000 },
  { name: "Bandalungwa", zone: "moyenne", deliveryFee: 5000 },
  { name: "Lingwala", zone: "moyenne", deliveryFee: 5500 },
  { name: "Kinshasa (commune)", zone: "moyenne", deliveryFee: 5500 },
  { name: "Barumbu", zone: "moyenne", deliveryFee: 6000 },
  { name: "Gombe", zone: "moyenne", deliveryFee: 6000 },
  { name: "Kintambo", zone: "moyenne", deliveryFee: 6500 },
  { name: "Lemba", zone: "moyenne", deliveryFee: 7000 },
  { name: "Limete", zone: "moyenne", deliveryFee: 7000 },
  { name: "Ngaba", zone: "moyenne", deliveryFee: 7000 },
  { name: "Matete", zone: "moyenne", deliveryFee: 7500 },
  { name: "Ngaliema", zone: "eloignee", deliveryFee: 8000 },
  { name: "Mont-Ngafula", zone: "eloignee", deliveryFee: 9000 },
  { name: "Kisenso", zone: "eloignee", deliveryFee: 9000 },
  { name: "N'djili", zone: "eloignee", deliveryFee: 10000 },
  { name: "Masina", zone: "eloignee", deliveryFee: 10000 },
  { name: "Kimbanseke", zone: "eloignee", deliveryFee: 11000 },
  { name: "N'sele", zone: "eloignee", deliveryFee: 12000 },
  { name: "Maluku", zone: "eloignee", deliveryFee: 15000 },
];

export const provinces = [
  "Kinshasa",
  "Kongo-Central",
  "Kwango",
  "Kwilu",
  "Mai-Ndombe",
  "Équateur",
  "Mongala",
  "Nord-Ubangi",
  "Sud-Ubangi",
  "Tshuapa",
  "Kasaï",
  "Kasaï-Central",
  "Kasaï-Oriental",
  "Lomami",
  "Sankuru",
  "Haut-Katanga",
  "Haut-Lomami",
  "Lualaba",
  "Tanganyika",
  "Maniema",
  "Nord-Kivu",
  "Sud-Kivu",
  "Bas-Uele",
  "Haut-Uele",
  "Ituri",
  "Tshopo",
];

export const promoCodes: { code: string; discount: number; type: "percent" | "fixed" }[] = [
  { code: "VSM10", discount: 10, type: "percent" },
  { code: "BIENVENUE", discount: 15, type: "percent" },
  { code: "FLASH5000", discount: 5000, type: "fixed" },
];
