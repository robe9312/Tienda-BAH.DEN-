'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[150px] font-black tracking-tighter leading-none text-primary/20 select-none">
            404
          </h1>
          <div className="relative -mt-12">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">
              Página <span className="text-primary">No Encontrada</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12">
              Lo sentimos, la página que buscas no existe o ha sido movida a otra dimensión tecnológica.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="rounded-full font-bold px-8 w-full sm:w-auto shadow-lg shadow-primary/20">
              <Home className="mr-2 size-5" /> Volver al Inicio
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full font-bold px-8 w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 size-5" /> Regresar
          </Button>
        </div>

        <div className="pt-12 border-t border-border/50">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            BAH.DEN Elite Technology — Malabo, GE
          </p>
        </div>
      </div>
    </div>
  );
}
