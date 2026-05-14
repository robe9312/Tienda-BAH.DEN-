'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Laptop, Watch, Headphones, Tablet, Camera, Speaker, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { name: 'Smartphones', icon: Smartphone },
  { name: 'Laptops', icon: Laptop },
  { name: 'Wearables', icon: Watch },
  { name: 'Audio', icon: Headphones },
  { name: 'Tablets', icon: Tablet },
  { name: 'Cámaras', icon: Camera },
  { name: 'Altavoces', icon: Speaker },
  { name: 'Monitores', icon: Monitor },
];

const duplicatedCategories = [...categories, ...categories, ...categories, ...categories];

interface CategoryRibbonProps {
  onSelectCategory?: (category: string | null) => void;
  selectedCategory?: string | null;
}

export default function CategoryRibbon({ onSelectCategory, selectedCategory }: CategoryRibbonProps) {
  return (
    <div className="relative w-full overflow-hidden bg-background py-6 border-y border-white/10 z-20">
      <div className="flex whitespace-nowrap">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-24 px-12"
        >
          {duplicatedCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => onSelectCategory?.(selectedCategory === category.name ? null : category.name)}
              className={cn(
                "flex items-center gap-4 transition-colors cursor-pointer outline-none",
                selectedCategory === category.name ? "text-primary" : "text-foreground/40 hover:text-primary"
              )}
            >
              <category.icon className="size-5 stroke-[1.5px]" />
              <span className="font-display uppercase tracking-[0.2em] text-xs md:text-sm">
                {category.name}
              </span>
              <span className="ml-12 text-primary/20 font-light">/</span>
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
