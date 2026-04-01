'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ShoppingCart, Plus } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      name: product.name,
      price: product.price,
      quantity: 1,
      icon: product.image,
      specs: product.specs,
    });
    toast.success(`${product.name} añadido al carrito`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-secondary/50 rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-colors"
    >
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="icon"
            className="rounded-full bg-primary text-primary-foreground"
            onClick={handleAddToCart}
          >
            <Plus className="size-5" />
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
          </div>
          <p className="text-lg font-bold text-primary">${product.price}</p>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {product.specs.slice(0, 2).map((spec, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-1 bg-background/50 rounded-full border border-border"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
