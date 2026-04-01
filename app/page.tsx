'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import CategoryRibbon from '@/components/category-ribbon';
import { products } from '@/lib/products';

export default function Home() {
  const featuredProducts = products.filter(p => p.featured);
  const otherProducts = products.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://picsum.photos/seed/tech-hero/1920/1080?blur=4"
              alt="Hero Background"
              fill
              className="object-cover opacity-40"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
          </div>

          <div className="container relative z-10 px-6 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
                iPhone 15 <span className="text-primary">Pro Max</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium">
                El titanio llega a <span className="text-primary font-bold">BAH.DEN</span>. Potencia, diseño y beneficios exclusivos en Malabo. La experiencia definitiva.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full text-lg px-8 py-6 h-auto font-bold">
                  Comprar Ahora <ArrowRight className="ml-2 size-5" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-6 h-auto font-bold">
                  Explorar Más
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="size-8 text-primary animate-bounce" />
          </motion.div>
        </section>

        <CategoryRibbon />

        {/* Featured Products */}
        <section id="catalog" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2">
                  Explorar <span className="text-primary">Colecciones</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Selección exclusiva de los dispositivos más avanzados del mundo, disponibles ahora en Guinea Ecuatorial.
                </p>
              </div>
              <Link href="/catalog" className="text-primary font-bold hover:underline flex items-center gap-2">
                Ver todo el catálogo <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
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
              <Button size="lg" className="rounded-full mt-8 font-bold">
                Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
