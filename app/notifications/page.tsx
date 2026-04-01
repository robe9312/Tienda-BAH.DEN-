'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Shield, Smartphone, Mail, ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
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
    toast.info('Configuración actualizada');
  };

  const handleSave = () => {
    toast.success('Preferencias guardadas correctamente');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              Configuración de <span className="text-primary">Notificaciones</span>
            </h1>
          </div>

          <div className="space-y-8">
            <Card className="bg-secondary/20 border-border/50 overflow-hidden">
              <CardHeader className="bg-secondary/30 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Smartphone className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Notificaciones Push</CardTitle>
                    <CardDescription>Recibe alertas instantáneas en tu dispositivo</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-bold">Alertas de Pedidos</Label>
                    <p className="text-sm text-muted-foreground">Estado de tus compras y envíos en Malabo</p>
                  </div>
                  <Switch checked={settings.push} onCheckedChange={() => handleToggle('push')} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-bold">Ofertas Exclusivas</Label>
                    <p className="text-sm text-muted-foreground">Nuevos lanzamientos y descuentos VIP</p>
                  </div>
                  <Switch checked={settings.offers} onCheckedChange={() => handleToggle('offers')} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/20 border-border/50 overflow-hidden">
              <CardHeader className="bg-secondary/30 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Mail className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Correo Electrónico</CardTitle>
                    <CardDescription>Resúmenes y noticias en tu bandeja de entrada</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-bold">Newsletter Semanal</Label>
                    <p className="text-sm text-muted-foreground">Lo mejor de la tecnología elite</p>
                  </div>
                  <Switch checked={settings.email} onCheckedChange={() => handleToggle('email')} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-bold">Actualizaciones de Seguridad</Label>
                    <p className="text-sm text-muted-foreground">Alertas críticas sobre tu cuenta</p>
                  </div>
                  <Switch checked={settings.security} onCheckedChange={() => handleToggle('security')} />
                </div>
              </CardContent>
            </Card>

            <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl flex gap-4 items-start">
              <Info className="size-6 text-primary shrink-0" />
              <div className="space-y-2">
                <p className="text-sm font-bold text-primary uppercase tracking-wider">Nota Importante</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Las notificaciones de seguridad críticas no pueden desactivarse para garantizar la protección de tu cuenta BAH.DEN.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/">
                <Button variant="ghost" className="rounded-full px-8">Cancelar</Button>
              </Link>
              <Button onClick={handleSave} className="rounded-full px-12 font-bold shadow-lg shadow-primary/20">
                Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
