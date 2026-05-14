'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import CategoryRibbon from '@/components/category-ribbon';
import WhatsAppButton from '@/components/whatsapp-button';
import { products } from '@/lib/products';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  
  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-mesh opacity-50" />
            <Image
              src="https://picsum.photos/seed/tech-luxury/1920/1080?blur=2"
              alt="Hero Background"
              fill
              className="object-cover opacity-20 grayscale"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="container relative z-10 px-6 text-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-8 block">
                The Future of Malabo
              </span>
              <h1 className="text-[15vw] md:text-[12vw] font-display leading-[0.85] mb-12 tracking-[-0.04em]">
                BAH<span className="text-primary">.</span>DEN
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/10 pt-12">
                <p className="text-lg md:text-xl text-muted-foreground max-w-md text-left font-light leading-relaxed">
                  Titanio de grado aeroespacial. Rendimiento sin precedentes. <span className="text-foreground font-medium">Exclusividad garantizada</span> en Guinea Ecuatorial.
                </p>
                <div className="flex gap-6">
                  <Button 
                    size="lg" 
                    className="rounded-none text-sm uppercase tracking-widest px-12 py-8 h-auto font-bold border-2 border-primary hover:bg-transparent hover:text-primary transition-all"
                    onClick={() => {
                      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explorar
                  </Button>
                  <div className="hidden md:flex flex-col items-end text-right">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-mono">Estreno 2026</span>
                    <span className="text-sm font-bold">Malabo Boutique</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 right-12 hidden lg:block"
          >
            <div className="flex items-center gap-4 rotate-90 origin-right">
              <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-mono">Scroll to explore</span>
              <div className="w-12 h-[1px] bg-primary" />
            </div>
          </motion.div>
        </section>

        <CategoryRibbon 
          onSelectCategory={setSelectedCategory} 
          selectedCategory={selectedCategory} 
        />

        {/* Featured Products */}
        <section id="catalog" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
              <div className="max-w-2xl">
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block font-mono">
                  Curated Selection
                </span>
                <h2 className="text-5xl md:text-7xl font-display leading-none mb-6">
                  Elite <span className="text-primary">Catalog</span>
                </h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  {selectedCategory 
                    ? `Explorando la colección de ${selectedCategory}.`
                    : "Nuestra selección no es para todos. Es para aquellos que demandan la perfección técnica y el diseño inigualable."
                  }
                </p>
              </div>
              <Link href="/catalog" className="group text-sm uppercase tracking-widest font-bold flex items-center gap-4 border-b border-primary pb-2 transition-all hover:gap-6 font-mono">
                Full Collection <ArrowRight className="size-4 text-primary" />
              </Link>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={product.id} 
                    className="bg-background"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-secondary/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-border"
            >
              <Image
                src="https://picsum.photos/seed/boutique/1200/800"
                alt="BAH.DEN Boutique"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
                Hablemos de <span className="text-primary">Tecnología</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                En BAH.DEN no solo vendemos dispositivos; ofrecemos una experiencia tecnológica de élite. Nuestra boutique en Malabo es el punto de encuentro para los amantes de la innovación y el diseño premium.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-primary uppercase text-xs tracking-widest">Ubicación</h4>
                  <p className="text-sm font-medium">Malabo, Guinea Ecuatorial<br />Calle de la Tecnología, 123</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-primary uppercase text-xs tracking-widest">Teléfono</h4>
                  <p className="text-sm font-medium">+240 555 123 456</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-primary uppercase text-xs tracking-widest">Email</h4>
                  <p className="text-sm font-medium">elite@bahden.com</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-primary uppercase text-xs tracking-widest">Horario</h4>
                  <p className="text-sm font-medium">Lun - Sáb: 9:00 - 20:00</p>
                </div>
              </div>
              <WhatsAppButton 
                size="lg" 
                className="rounded-full mt-8 font-bold" 
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
