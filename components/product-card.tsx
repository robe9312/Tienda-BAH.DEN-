'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export interface Product {
  id: string;
  name_es: string;
  name_fr: string;
  price_xaf: number;
  image: string;
  category: string;
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { language, currency, t } = useSettings();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ 
      id: product.id, 
      name: language === 'es' ? product.name_es : product.name_fr, 
      price: product.price_xaf, 
      quantity: 1, 
      image: product.image 
    });
    toast.success(t('product.add'), {
      className: 'glass border-primary text-foreground',
    });
  };

  const getPriceByCurrency = () => {
    if (currency === 'USD') return `$ ${(product.price_xaf / 600).toFixed(2)}`;
    if (currency === 'EUR') return `€ ${(product.price_xaf / 655).toFixed(2)}`;
    return `${product.price_xaf.toLocaleString()} XAF`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="group relative cyber-border p-4 bg-secondary/30 backdrop-blur-sm overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Image */}
      <div className="relative aspect-square mb-6 overflow-hidden bg-black/40">
        <Image 
          src={product.image} 
          alt={product.name_es} 
          fill 
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 right-2">
          <Button 
            onClick={handleAdd}
            size="icon" 
            className="rounded-none bg-primary hover:bg-accent text-white shadow-[0_0_15px_rgba(197,160,89,0.3)]"
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <span className="text-[10px] tracking-[0.2em] text-primary uppercase font-accent">
          {product.category}
        </span>
        <h4 className="font-display text-sm tracking-widest font-bold text-foreground">
          {language === 'es' ? product.name_es : product.name_fr}
        </h4>
        <div className="pt-2 flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-foreground">
            {getPriceByCurrency()}
          </span>
          <div className="size-2 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
