'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tighter text-primary">BAH.DEN</h3>
            <p className="text-sm text-muted-foreground">
              Elite Technology Boutique. Llevando la innovación y el diseño premium a Malabo, Guinea Ecuatorial.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="size-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="size-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="size-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="/#catalog" className="text-muted-foreground hover:text-primary transition-colors">Catálogo</Link></li>
              <li><Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidad</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Envíos y Devoluciones</Link></li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="size-5 text-primary shrink-0" />
                <span className="text-muted-foreground">Malabo, Guinea Ecuatorial<br />Calle de la Tecnología, 123</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 text-primary shrink-0" />
                <span className="text-muted-foreground">+240 555 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-primary shrink-0" />
                <span className="text-muted-foreground">elite@bahden.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BAH.DEN. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span>Diseñado con precisión</span>
            <span>Malabo, GE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
