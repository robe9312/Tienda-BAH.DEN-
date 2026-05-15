'use client';

import React from 'react';
import Link from 'next/link';
import { useSettings } from '@/contexts/SettingsContext';
import { Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useSettings();

  return (
    <footer className="relative mt-20 pb-10 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto pt-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex flex-col">
            <span className="font-display text-3xl font-bold tracking-[0.2em] text-foreground">
              BAH.<span className="text-primary">DAN</span>
            </span>
            <span className="text-[10px] tracking-[0.4em] text-muted-foreground font-accent">
              ELITE FUTURE TECH
            </span>
          </Link>
          <p className="text-xs text-muted-foreground font-light leading-relaxed tracking-wider">
            Liderando la revolución tecnológica en África Central con estética de lujo y rendimiento sin fronteras.
          </p>
          <div className="flex space-x-4">
            {[Instagram, Twitter].map((Icon, i) => (
              <Link key={i} href="#" className="p-2 glass hover:bg-primary transition-colors hover:text-white">
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display text-xs tracking-[0.3em] font-bold uppercase mb-8">Navegación</h4>
          <ul className="space-y-4">
            {['Incio', 'Catálogo', 'Sobre Nosotros', 'Contacto'].map((l) => (
              <li key={l}>
                <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-widest">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-display text-xs tracking-[0.3em] font-bold uppercase mb-8">Categorías</h4>
          <ul className="space-y-4">
            {['Smartphones', 'Laptops', 'Audio Premium', 'Relojes'].map((l) => (
              <li key={l}>
                <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-widest">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-xs tracking-[0.3em] font-bold uppercase mb-8">Ubicación</h4>
          <ul className="space-y-6">
            <li className="flex items-start space-x-4">
              <MapPin className="size-4 text-primary shrink-0" />
              <span className="text-xs text-muted-foreground leading-relaxed">Malabo II, Boutique High-End, Guinea Ecuatorial.</span>
            </li>
            <li className="flex items-center space-x-4">
              <Phone className="size-4 text-primary" />
              <span className="text-xs text-muted-foreground">+240 000 000 000</span>
            </li>
            <li className="flex items-center space-x-4">
              <Mail className="size-4 text-primary" />
              <span className="text-xs text-muted-foreground">elite@bahdan.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-[10px] tracking-[0.5em] text-muted-foreground uppercase">
          © 2026 BAH.DAN — Boutique Tecnológica de Lujo
        </span>
        <div className="flex items-center space-x-8">
          {['Privacidad', 'Términos', 'Envíos'].map((l) => (
            <Link key={l} href="#" className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase hover:text-primary">{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
