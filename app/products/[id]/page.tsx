'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, Shield, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import { products } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { toast } from 'sonner';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = React.useState(1);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem({
      name: product.name,
      price: product.price,
      quantity: quantity,
      icon: product.image,
      specs: product.specs,
    });
    toast.success(`${product.name} añadido al carrito`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12 font-mono"
          >
            <ArrowLeft className="size-4" /> Volver al catálogo
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-[4/5] bg-secondary/50 overflow-hidden border border-border"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-primary font-mono font-bold tracking-[0.3em] uppercase text-xs mb-4">
                {product.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-display leading-none mb-6">
                {product.name}
              </h1>
              <p className="text-3xl font-mono text-foreground mb-8">
                ${product.price}
              </p>
              
              <div className="space-y-6 mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  {product.description}
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest font-mono">Especificaciones</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="size-1.5 bg-primary rounded-full" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <div className="flex items-center border border-border">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:bg-secondary transition-colors"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-12 text-center font-mono font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 hover:bg-secondary transition-colors"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 rounded-none h-auto py-4 text-sm uppercase tracking-widest font-bold"
                >
                  Añadir al carrito
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-border">
                <div className="flex flex-col items-center text-center gap-3">
                  <Shield className="size-6 text-primary" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Garantía Elite</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <Truck className="size-6 text-primary" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Envío en Malabo</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <RotateCcw className="size-6 text-primary" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Devolución 30 días</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
