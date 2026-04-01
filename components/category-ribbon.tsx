'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Laptop, Watch, Headphones, Tablet, Camera, Speaker, Monitor } from 'lucide-react';

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

// Duplicate categories to create the infinite loop effect
const duplicatedCategories = [...categories, ...categories, ...categories, ...categories];

export default function CategoryRibbon() {
  return (
    <div className="relative w-full overflow-hidden bg-primary py-4 border-y-4 border-black dark:border-white/10 z-20 -rotate-1 scale-105 shadow-2xl">
      <div className="flex whitespace-nowrap">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-12 px-6"
        >
          {duplicatedCategories.map((category, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-black font-black uppercase italic tracking-tighter text-xl md:text-2xl"
            >
              <category.icon className="size-6 md:size-8 stroke-[3px]" />
              <span>{category.name}</span>
              <span className="ml-8 text-black/30">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
