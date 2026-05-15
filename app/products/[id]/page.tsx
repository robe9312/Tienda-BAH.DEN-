'use client';

import React, { useState, use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Header as Navbar } from '@/components/header';
import { Footer } from '@/components/footer';
import { demoProducts } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Plus, Minus, ShoppingCart, Zap, Shield, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = demoProducts.find((p) => p.id === id);
  const { addItem } = useCart();
  const { language, currency, t } = useSettings();
  const [quantity, setQuantity] = useState(1);

  if (!product) notFound();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: language === 'es' ? product.name_es : product.name_fr,
      price: product.price_xaf,
      quantity,
      image: product.image
    });
    toast.success(t('product.add'), {
      className: 'glass border-primary text-foreground',
    });
  };

  const getPriceByCurrency = (amount: number) => {
    if (currency === 'USD') return `$ ${(amount / 600).toFixed(2)}`;
    if (currency === 'EUR') return `€ ${(amount / 655).toFixed(2)}`;
    return `${amount.toLocaleString()} XAF`;
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery HUD */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square glass overflow-hidden border-primary/20"
            >
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-mono border border-primary/40 px-2 py-1 text-primary bg-black/40">
                  REF::{product.id.padStart(4, '0')}
                </span>
              </div>
              <Image 
                src={product.image} 
                alt={product.name_es} 
                fill 
                className="object-contain p-12"
                referrerPolicy="no-referrer"
              />
              {/* HUD Overlays */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <div className="size-1 bg-primary animate-ping" />
                <div className="size-1 bg-accent animate-pulse" />
              </div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square glass opacity-40 hover:opacity-100 transition-opacity cursor-pointer p-2 overflow-hidden border-white/5">
                  <Image src={product.image} alt="Thumb" width={100} height={100} className="object-contain grayscale hover:grayscale-0 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-10">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-primary font-accent tracking-[0.4em] uppercase text-xs"
              >
                {product.category}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-4xl md:text-6xl font-bold tracking-tighter"
              >
                {language === 'es' ? product.name_es : product.name_fr}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-mono text-foreground font-bold"
              >
                {getPriceByCurrency(product.price_xaf)}
              </motion.p>
            </div>

            <div className="h-[1px] w-full bg-white/5" />

            <div className="space-y-4 text-muted-foreground text-sm tracking-widest font-light leading-relaxed">
              <p>
                Experimente la cúspide de la ingeniería moderna. Este dispositivo ha sido diseñado bajo los estándares más altos de Neom y Dubai Future Foundation, garantizando un rendimiento sin precedentes.
              </p>
              <ul className="space-y-2 pt-4">
                <li className="flex items-center gap-3"><Zap className="size-4 text-primary" /> Procesamiento Cuántico de 8va Gen</li>
                <li className="flex items-center gap-3"><Shield className="size-4 text-primary" /> Seguridad Biométrica de Grado Militar</li>
                <li className="flex items-center gap-3"><Truck className="size-4 text-primary" /> Entrega Elite en Malabo / Bata</li>
              </ul>
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-8">
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Cantidad</span>
                <div className="flex items-center border border-white/10">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:text-primary transition-colors"><Minus className="size-4" /></button>
                  <span className="w-12 text-center font-mono text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-4 hover:text-primary transition-colors"><Plus className="size-4" /></button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleAdd}
                  size="lg" 
                  className="flex-1 rounded-none h-16 bg-primary hover:bg-accent text-white uppercase tracking-[0.2em] font-bold gap-3 group shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all"
                >
                  <ShoppingCart className="size-5 group-hover:scale-110 transition-transform" />
                  {t('product.add')}
                </Button>
                <Button variant="outline" size="lg" className="rounded-none h-16 px-10 uppercase tracking-[0.2em] font-bold bg-transparent border-white/10 hover:bg-white/5">
                  Specs
                </Button>
              </div>
            </div>

            <div className="pt-10 grid grid-cols-2 gap-4">
              <div className="glass p-4 border-white/5">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Stock Status</p>
                <p className="text-xs font-bold text-accent">DISPONIBLE :: BATCH_04</p>
              </div>
              <div className="glass p-4 border-white/5">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Region Focus</p>
                <p className="text-xs font-bold">CENTRAL AFRICA / GCC</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
