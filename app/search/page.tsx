'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowLeft, Filter, X } from 'lucide-react';
import { products } from '@/lib/products';
import ProductCard from '@/components/product-card';
import Header from '@/components/header';
import Footer from '@/components/footer';
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
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-6">
            Resultados de <span className="text-primary">Búsqueda</span>
          </h1>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos, marcas o categorías..."
              className="pl-12 py-6 h-auto rounded-2xl text-lg bg-secondary/30 border-border/50 focus:border-primary/50 transition-all"
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

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            className="rounded-full px-4"
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              className="rounded-full px-4"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between text-sm text-muted-foreground">
        <p>
          {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          {query && <span> para &quot;<span className="text-primary font-bold">{query}</span>&quot;</span>}
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-32 bg-secondary/10 rounded-3xl border border-dashed border-border"
        >
          <div className="bg-secondary size-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="size-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No se encontraron resultados</h2>
          <p className="text-muted-foreground mb-8">Intenta con otros términos de búsqueda o explora nuestras categorías.</p>
          <Button
            variant="outline"
            className="rounded-full font-bold px-8"
            onClick={() => {
              setQuery('');
              setSelectedCategory(null);
            }}
          >
            Limpiar búsqueda
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-24 px-6">
        <Suspense fallback={<div className="text-center py-32">Cargando resultados...</div>}>
          <SearchContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
