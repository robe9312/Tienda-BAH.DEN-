'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Smartphone, Mail, ArrowLeft, Info, Zap } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function NotificationsPage() {
  const [settings, setSettings] = useState({
    push: true,
    email: false,
    offers: true,
    security: true,
    updates: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.info('SISTEMA:: Configuración sincronizada', {
      className: 'glass text-foreground'
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="pt-40 pb-20 px-6 max-w-3xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center text-[10px] tracking-widest text-primary hover:gap-3 transition-all gap-2 uppercase">
              <ArrowLeft className="size-3" /> Regresar al Centro
            </Link>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">
              SISTEMA DE <span className="text-primary underline decoration-white/10 underline-offset-8">ALERTAS</span>
            </h1>
            <p className="text-muted-foreground text-sm tracking-widest font-light">
              Configura los protocolos de comunicación entre la plataforma BAH.DAN y tus dispositivos finales.
            </p>
          </div>

          <div className="space-y-8">
            <section className="glass p-8 border-white/5 space-y-8">
              <div className="flex items-center gap-4 text-primary">
                <Smartphone className="size-5" />
                <h3 className="font-display text-xs tracking-[0.3em] font-bold uppercase">Interfaz Móvil</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold tracking-widest uppercase">Estado de Pedidos</Label>
                    <p className="text-[10px] text-muted-foreground">Alertas críticas sobre logística en Malabo/Bata</p>
                  </div>
                  <Switch checked={settings.push} onCheckedChange={() => handleToggle('push')} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold tracking-widest uppercase">Lanzamientos VIP</Label>
                    <p className="text-[10px] text-muted-foreground">Notificaciones anticipadas sobre stock limitado</p>
                  </div>
                  <Switch checked={settings.offers} onCheckedChange={() => handleToggle('offers')} />
                </div>
              </div>
            </section>

            <section className="glass p-8 border-white/5 space-y-8">
              <div className="flex items-center gap-4 text-primary">
                <Mail className="size-5" />
                <h3 className="font-display text-xs tracking-[0.3em] font-bold uppercase">Protocolo Email</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold tracking-widest uppercase">Seguridad Crítica</Label>
                    <p className="text-[10px] text-muted-foreground">Alertas sobre accesos no autorizados al sistema</p>
                  </div>
                  <Switch checked={settings.security} onCheckedChange={() => handleToggle('security')} />
                </div>
              </div>
            </section>

            <div className="bg-primary/5 border border-primary/20 p-6 flex gap-4">
              <Zap className="size-6 text-primary shrink-0" />
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Cifrado de Extremo a Extremo</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Todas sus preferencias de comunicación se almacenan de forma segura en los servidores de BAH.DAN con cifrado cuántico.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-6 pt-10">
              <Button variant="outline" className="rounded-none px-10 uppercase tracking-widest text-[10px] font-bold border-white/10">Reiniciar</Button>
              <Button className="rounded-none px-12 uppercase tracking-widest text-[10px] font-bold glow-primary">Sincronizar Protocolo</Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
