import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe, Users, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-32 md:pt-40">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="vsm-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
              Notre Histoire
            </p>
            <h1 className="mt-2 font-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
              À Propos
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              VSM Collection est née de la passion pour le streetwear et de la fierté de 
              représenter la République Démocratique du Congo sur la scène internationale de la mode.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="vsm-section bg-card">
        <div className="vsm-container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
                Made in DRC,<br />
                <span className="text-primary">Worn Worldwide</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Fondée à Kinshasa, VSM Collection incarne l'esprit créatif et 
                l'énergie de la jeunesse congolaise. Notre mission est simple : 
                créer des vêtements de qualité qui racontent notre histoire tout 
                en répondant aux standards internationaux du streetwear.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Chaque pièce VSM est conçue avec passion, fabriquée avec soin, 
                et portée avec fierté par une communauté grandissante de personnes 
                qui partagent notre vision d'un style authentique et sans compromis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Globe, label: "Présence mondiale", value: "15+ pays" },
                { icon: Users, label: "Clients satisfaits", value: "5000+" },
                { icon: Award, label: "Années d'expertise", value: "5 ans" },
                { icon: Heart, label: "Pièces créées", value: "200+" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="vsm-card flex flex-col items-center p-6 text-center"
                >
                  <stat.icon className="mb-3 h-8 w-8 text-primary" />
                  <span className="font-display text-2xl font-bold">{stat.value}</span>
                  <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vsm-section">
        <div className="vsm-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
              Notre Vision
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
              Le Streetwear Africain<br />à la Conquête du Monde
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Nous croyons que le talent n'a pas de frontières. VSM Collection prouve 
              chaque jour que l'excellence peut venir de n'importe où, y compris du 
              cœur de l'Afrique. Notre objectif est de placer le Congo sur la carte 
              mondiale de la mode urbaine.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
