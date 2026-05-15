'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSettings } from '@/contexts/SettingsContext';

const demoCategories = [
  { id: '1', name_es: 'Smartphones Elite', name_fr: 'Smartphones Élite', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800&auto=format&fit=crop' },
  { id: '2', name_es: 'Laptops Futuristas', name_fr: 'PC Portables Futuristes', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop' },
  { id: '3', name_es: 'Audio de Lujo', name_fr: 'Audio de Luxe', image: 'https://images.unsplash.com/photo-1546435770-a3e426ff472b?q=80&w=800&auto=format&fit=crop' },
  { id: '4', name_es: 'Relojes Inteligentes', name_fr: 'Montres Intelligentes', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop' },
  { id: '5', name_es: 'Gaming de Élite', name_fr: 'Gaming d\'Élite', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop' },
];

export function CategoryScroll() {
  const { language } = useSettings();

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-end justify-between border-b border-border pb-4">
          <h2 className="font-display text-2xl tracking-widest uppercase">
            Categorías <span className="text-primary">Curadas</span>
          </h2>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-accent">Explora el Ecosistema</span>
        </div>

        <div className="flex space-x-6 overflow-x-auto pb-8 custom-scrollbar scroll-smooth">
          {demoCategories.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              whileHover={{ y: -10 }}
              className="flex-shrink-0 w-72 md:w-80 group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image 
                  src={cat.image} 
                  alt={cat.name_es} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 space-y-1">
                  <span className="text-[10px] text-primary tracking-[0.3em] font-accent uppercase">0{idx + 1}</span>
                  <h3 className="font-display text-lg tracking-wider text-white">
                    {language === 'es' ? cat.name_es : cat.name_fr}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
