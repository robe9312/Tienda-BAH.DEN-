'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Globe, CreditCard, Menu, X, Search, Smartphone } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Header() {
  const { itemCount } = useCart();
  const { language, setLanguage, currency, setCurrency, t } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "glass py-2" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex flex-col">
          <span className="font-display text-2xl font-bold tracking-[0.2em] text-foreground">
            BAH.<span className="text-primary glow-primary">DAN</span>
          </span>
          <span className="text-[10px] tracking-[0.4em] text-muted-foreground font-accent">
            PREMIUM ELITE
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {['home', 'catalog', 'about', 'contact'].map((item) => (
            <Link 
              key={item} 
              href={item === 'home' ? '/' : `/#${item}`}
              className="group relative text-xs uppercase tracking-widest font-medium text-foreground hover:text-primary transition-colors"
            >
              {t(`nav.${item}`)}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex items-center space-x-4">
          {/* Lang Selector */}
          <div className="hidden sm:flex items-center space-x-2 border-r border-border pr-4">
            <button 
              onClick={() => setLanguage(language === 'es' ? 'fr' : 'es')}
              className="flex items-center space-x-1 text-[10px] uppercase tracking-tighter hover:text-primary transition-colors"
            >
              <Globe className="size-3" />
              <span>{language}</span>
            </button>
            <div className="group relative">
              <button className="flex items-center space-x-1 text-[10px] uppercase tracking-tighter hover:text-primary transition-colors">
                <CreditCard className="size-3" />
                <span>{currency}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 hidden group-hover:block glass p-2 w-20">
                {['XAF', 'USD', 'EUR'].map((curr) => (
                  <button 
                    key={curr} 
                    onClick={() => setCurrency(curr as any)}
                    className="block w-full text-left text-[10px] py-1 hover:text-primary"
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Icon */}
          <Link href="/cart" className="relative p-2 hover:bg-white/5 rounded-full transition-colors group">
            <ShoppingCart className="size-5 text-foreground group-hover:text-primary" />
            {itemCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 size-4 bg-primary text-[10px] flex items-center justify-center rounded-full text-white font-bold"
              >
                {itemCount}
              </motion.span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass md:hidden overflow-hidden border-t border-border"
          >
            <div className="flex flex-col p-6 space-y-4">
              {['home', 'catalog', 'about', 'contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`/#${item}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-bold text-foreground"
                >
                  {t(`nav.${item}`)}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" onClick={() => setLanguage(language === 'es' ? 'fr' : 'es')}>
                  <Globe className="size-3 mr-2" /> {language.toUpperCase()}
                </Button>
                <Button variant="ghost" size="sm">
                  <CreditCard className="size-3 mr-2" /> {currency}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Header;
