'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesQuery = 
        product.name_es.toLowerCase().includes(query.toLowerCase()) ||
        product.name_fr.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col space-y-12">
        <div className="space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-accent tracking-[0.4em] uppercase text-xs"
          >
            Terminal de Búsqueda
          </motion.span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">
            EXPLORAR <span className="text-primary">SISTEMA</span>
          </h1>
          
          <div className="relative max-w-3xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: Titanium, Gaming, Audio..."
              className="pl-12 py-8 bg-secondary/20 border-white/10 rounded-none text-xl font-display tracking-widest focus:ring-1 focus:ring-primary"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 border-b border-white/5 pb-8">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            className="rounded-none tracking-widest font-accent text-[10px] uppercase"
            onClick={() => setSelectedCategory(null)}
          >
            ALL_DEVICES
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className="rounded-none tracking-widest font-accent text-[10px] uppercase"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.replace(' ', '_').toUpperCase()}
            </Button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-40 text-center glass border-dashed">
            <p className="text-muted-foreground tracking-widest italic">SISTEMA:: Sin resultados para &quot;{query}&quot;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <Suspense fallback={<div className="flex justify-center py-40"><Loader2 className="animate-spin text-primary size-12" /></div>}>
          <SearchContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
