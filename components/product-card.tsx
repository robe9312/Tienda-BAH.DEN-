'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ShoppingCart, Eye, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
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
    <Link href={`/products/${product.id}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="group relative bg-background transition-all duration-500 hover:glow-orange"
      >
        <div className="aspect-[4/5] relative overflow-hidden bg-secondary/50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            referrerPolicy="no-referrer"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-6 backdrop-blur-sm">
            <div className="flex gap-4">
              <Button size="icon" variant="outline" className="rounded-none border-white/20 hover:border-primary hover:bg-primary hover:text-white transition-all">
                <Eye className="size-4" />
              </Button>
              <Button size="icon" className="rounded-none bg-white text-black hover:bg-primary hover:text-white transition-all" onClick={handleAddToCart}>
                <Plus className="size-4" />
              </Button>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono font-bold text-white/60">Quick View</span>
          </div>
        </div>

        <div className="p-8 border-t border-border">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-mono font-bold">{product.category}</span>
              <span className="text-sm font-mono tracking-tighter">${product.price}</span>
            </div>
            
            <h3 className="text-xl font-display leading-none tracking-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
              {product.description}
            </p>

            <button 
              onClick={handleAddToCart}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-foreground hover:text-primary transition-all mt-2"
            >
              Add to collection <ArrowRight className="size-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
