'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Search, Menu, X, Moon, Sun, ArrowRight, TrendingUp } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { products } from '@/lib/products';
import Image from 'next/image';

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Catálogo', href: '/#catalog' },
  { label: 'Sobre Nosotros', href: '/#about' },
  { label: 'Contacto', href: '/#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'XAF' | 'EUR'>('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const searchDropdownRef = React.useRef<HTMLDivElement>(null);
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  const filteredProducts = searchQuery.trim() 
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const currencies = [
    { label: 'USD', value: 'USD' },
    { label: 'XAF', value: 'XAF' },
    { label: 'EUR', value: 'EUR' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">
          BAH.DEN
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Currency Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1 border border-border/50">
            {currencies.map((c) => (
              <button
                key={c.value}
                onClick={() => setCurrency(c.value as any)}
                className={cn(
                  'text-[10px] font-mono px-2 py-0.5 rounded-full transition-all',
                  currency === c.value ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative" ref={searchDropdownRef}>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("rounded-full transition-colors", isSearchOpen && "text-primary bg-secondary")}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              onFocus={() => setIsSearchOpen(true)}
            >
              <Search className="size-5" />
            </Button>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-4 w-80 md:w-96 bg-background border border-border p-4 shadow-2xl z-50 rounded-none"
                >
                  <div className="relative mb-6">
                    <input 
                      ref={searchInputRef}
                      type="text" 
                      placeholder="Search elite technology..." 
                      className="w-full bg-secondary/50 border-none px-4 py-3 pr-10 text-sm font-mono focus:ring-1 focus:ring-primary outline-none transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery ? (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:text-primary transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                    ) : (
                      <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    )}
                  </div>

                  <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {searchQuery.trim() === '' ? (
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="size-3 text-primary" /> Trending Now
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {['Titanium', 'Elite', 'Malabo', 'Pro', 'Boutique'].map((tag) => (
                              <button 
                                key={tag}
                                onClick={() => setSearchQuery(tag)}
                                className="text-[10px] font-mono px-3 py-1 bg-secondary hover:bg-primary hover:text-white transition-all border border-border/50"
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="py-4 border-t border-border/50">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold mb-4">Quick Links</p>
                          <div className="grid grid-cols-2 gap-2">
                            {navItems.map((item) => (
                              <Link 
                                key={item.href} 
                                href={item.href}
                                onClick={() => setIsSearchOpen(false)}
                                className="text-xs font-medium p-2 hover:bg-secondary transition-colors border border-transparent hover:border-border/50"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : filteredProducts.length > 0 ? (
                      <>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Suggestions</p>
                        <div className="space-y-3">
                          {filteredProducts.map((product) => (
                            <Link 
                              key={product.id} 
                              href={`/products/${product.id}`}
                              onClick={() => setIsSearchOpen(false)}
                              className="flex items-center gap-4 p-2 hover:bg-secondary transition-colors group border border-transparent hover:border-border/50"
                            >
                              <div className="relative size-12 bg-secondary overflow-hidden shrink-0">
                                <Image 
                                  src={product.image} 
                                  alt={product.name} 
                                  fill 
                                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{product.name}</h4>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">{product.category}</p>
                              </div>
                              <span className="text-xs font-mono font-bold">${product.price}</span>
                            </Link>
                          ))}
                        </div>
                        <Link 
                          href="/catalog" 
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center justify-center gap-2 py-4 border-t border-border mt-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-primary transition-all group"
                        >
                          View all products <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </>
                    ) : (
                      <div className="py-12 text-center">
                        <p className="text-xs text-muted-foreground italic mb-2">No products found for &quot;{searchQuery}&quot;</p>
                        <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Try searching for &quot;Titanium&quot;</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingCart className="size-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold size-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
