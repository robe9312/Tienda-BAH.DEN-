'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function Hero() {
  const { t } = useSettings();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with Mesh Gradient */}
      <div className="absolute inset-0 z-0 bg-mesh opacity-60" />
      
      {/* Cinematic Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] z-0 animate-pulse" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-accent text-primary tracking-[0.4em] uppercase text-xs md:text-sm"
          >
            Dubai Future Foundation Inspired
          </motion.span>
          
          <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter leading-none text-foreground">
            {t('hero.title')}
          </h1>
          
          <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-xl font-light tracking-wide">
            {t('hero.subtitle')}
          </p>

          <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-none h-14 px-8 uppercase tracking-widest text-xs font-bold gap-2 group">
              {t('hero.cta')}
              <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-none h-14 px-8 uppercase tracking-widest text-xs font-bold bg-transparent border-white/10 hover:bg-white/5">
              Discovery Center
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-10 left-10 hidden xl:flex flex-col space-y-4">
        {['NEOM', 'LUCID', 'CRYSTAL'].map((label, idx) => (
          <div key={label} className="flex items-center space-x-2 text-[10px] tracking-widest text-muted-foreground">
            <span className="w-4 h-[1px] bg-border" />
            <span>0{idx + 1} {label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
