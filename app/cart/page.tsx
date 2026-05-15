'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, MoveRight, Smartphone } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Header as Navbar } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();
  const { currency, t } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Orange Money'
  });

  const getPriceByCurrency = (amount: number) => {
    if (currency === 'USD') return `$ ${(amount / 600).toFixed(2)}`;
    if (currency === 'EUR') return `€ ${(amount / 655).toFixed(2)}`;
    return `${amount.toLocaleString()} XAF`;
  };

  const handleCheckout = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Por favor complete todos los datos de envío.');
      return;
    }

    const cartDetails = items.map(i => `${i.name} x${i.quantity} - ${getPriceByCurrency(i.price * i.quantity)}`).join('\n');
    const message = `
━━━━━━━━━━
🚀 *NUEVO PEDIDO BAH.DAN*
━━━━━━━━━━

*CLIENTE:* ${formData.name}
*TELÉFONO:* ${formData.phone}
*DIRECCIÓN:* ${formData.address}

*PEDIDO:*
${cartDetails}

*TOTAL:* ${getPriceByCurrency(total)}
*MÉTODO:* ${formData.paymentMethod}

━━━━━━━━━━
_Gracias por elegir BAH.DAN Elite._
    `.trim();

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '240000000000';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  if (itemCount === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 h-[70vh] flex flex-col items-center justify-center text-center px-6">
          <div className="size-20 bg-secondary flex items-center justify-center rounded-full mb-8">
            <Trash2 className="size-8 text-muted-foreground" />
          </div>
          <h1 className="font-display text-2xl tracking-widest uppercase mb-4">{t('cart.empty')}</h1>
          <Link href="/#catalog">
            <Button variant="outline" className="rounded-none tracking-[0.2em] font-accent">
              REGRESAR AL CATÁLOGO
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-40 pb-20 px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Items List */}
          <div className="flex-1 space-y-8">
            <h1 className="font-display text-3xl font-bold tracking-[0.2em] uppercase border-b border-border pb-4">
              TU BOLSA <span className="text-primary">ELITE</span> ({itemCount})
            </h1>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="glass p-4 flex items-center gap-6 group hover:border-primary transition-colors"
                  >
                    <div className="relative size-24 bg-black/40 overflow-hidden shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-2" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-display text-sm tracking-widest font-bold">{item.name}</h3>
                      <p className="font-mono text-[10px] text-muted-foreground mt-1">{getPriceByCurrency(item.price)}</p>
                      
                      <div className="flex items-center space-x-4 mt-4">
                        <div className="flex items-center border border-border">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:text-primary transition-colors"><Minus className="size-3" /></button>
                          <span className="w-8 text-center text-xs font-mono">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:text-primary transition-colors"><Plus className="size-3" /></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
                          Eliminar
                        </button>
                      </div>
                    </div>

                    <div className="text-right hidden sm:block">
                      <span className="font-mono text-sm font-bold">{getPriceByCurrency(item.price * item.quantity)}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Checkout Info */}
          <div className="w-full lg:w-[400px] space-y-8">
            <div className="glass p-8 space-y-8 sticky top-24">
              <h2 className="font-display text-lg tracking-[0.2em] font-bold border-b border-white/5 pb-4">RESUMEN DEL PEDIDO</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-[10px] uppercase tracking-widest mb-2 block font-accent">Nombre Completo</Label>
                    <Input 
                      id="name" 
                      placeholder="Ej: Juan Nguema" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-background/20 border-white/10 rounded-none h-12 text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-[10px] uppercase tracking-widest mb-2 block font-accent">Teléfono (WhatsApp)</Label>
                    <Input 
                      id="phone" 
                      placeholder="Ej: +240 222 333 444" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-background/20 border-white/10 rounded-none h-12 text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-[10px] uppercase tracking-widest mb-2 block font-accent">Dirección de Entrega</Label>
                    <Input 
                      id="address" 
                      placeholder="Ej: Barrio Paraiso, Malabo" 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="bg-background/20 border-white/10 rounded-none h-12 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-4 border-t border-white/5 pt-6">
                  <div className="flex justify-between items-center text-muted-foreground text-xs tracking-widest">
                    <span>SUBTOTAL</span>
                    <span>{getPriceByCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground text-xs tracking-widest">
                    <span>ENVÍO ELITE</span>
                    <span className="text-accent">GRATIS</span>
                  </div>
                  <div className="flex justify-between items-center text-foreground font-bold tracking-[0.2em] pt-4 border-t border-white/5">
                    <span>TOTAL</span>
                    <span className="text-primary text-xl font-mono">{getPriceByCurrency(total)}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckout}
                  size="lg" 
                  className="w-full rounded-none h-14 bg-primary hover:bg-accent text-white uppercase tracking-[0.2em] text-xs font-bold gap-3 shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all"
                >
                  Confirmar vía WhatsApp <Smartphone className="size-4" />
                </Button>
                
                <p className="text-[9px] text-muted-foreground text-center tracking-widest uppercase font-light leading-relaxed">
                  Al confirmar, serás redirigido a WhatsApp para coordinar el pago via Orange Money o Muni Dinero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
