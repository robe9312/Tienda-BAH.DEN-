'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'fr';
type Currency = 'XAF' | 'USD' | 'EUR';

interface SettingsContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    'nav.home': 'Inicio',
    'nav.catalog': 'Catálogo',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'hero.title': 'El Futuro de la Tecnología en África',
    'hero.subtitle': 'Boutique premium con lo último en innovación global.',
    'hero.cta': 'Explorar Colección',
    'cart.empty': 'Tu carrito está vacío',
    'cart.checkout': 'Finalizar Pedido vía WhatsApp',
    'product.add': 'Agregar al Carrito',
    'product.stock': 'Stock disponible',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.catalog': 'Catalogue',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'hero.title': "L'Avenir de la Technologie en Afrique",
    'hero.subtitle': 'Boutique premium avec le dernier cri de l\'innovation mondiale.',
    'hero.cta': 'Explorer la Collection',
    'cart.empty': 'Votre panier est vide',
    'cart.checkout': 'Finaliser la Commande via WhatsApp',
    'product.add': 'Ajouter au Panier',
    'product.stock': 'Stock disponible',
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [currency, setCurrency] = useState<Currency>('XAF');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <SettingsContext.Provider value={{ language, currency, setLanguage, setCurrency, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
