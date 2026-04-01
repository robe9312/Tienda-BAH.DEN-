'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              Tu <span className="text-primary">Carrito</span>
            </h1>
            <Link href="/#catalog">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="size-4" /> Continuar comprando
              </Button>
            </Link>
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border"
            >
              <div className="bg-secondary size-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="size-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
              <p className="text-muted-foreground mb-8">Agrega algunos productos para comenzar tu experiencia BAH.DEN.</p>
              <Link href="/#catalog">
                <Button size="lg" className="rounded-full font-bold px-8">
                  Explorar Catálogo
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.name}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-6 p-6 bg-secondary/30 rounded-2xl border border-border/50 group"
                    >
                      <div className="relative size-24 shrink-0 rounded-xl overflow-hidden bg-background border border-border">
                        <Image
                          src={item.icon}
                          alt={item.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {item.specs?.join(', ')}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive rounded-full"
                            onClick={() => removeItem(item.name)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>

                        <div className="flex justify-between items-end mt-4">
                          <div className="flex items-center gap-3 bg-background/50 rounded-full p-1 border border-border">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-full"
                              onClick={() => updateQuantity(item.name, Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="size-3" />
                            </Button>
                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-full"
                              onClick={() => updateQuantity(item.name, item.quantity + 1)}
                            >
                              <Plus className="size-3" />
                            </Button>
                          </div>
                          <p className="font-bold text-primary text-lg">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </Button>
              </div>

              <div className="space-y-6">
                <div className="bg-secondary/50 p-8 rounded-3xl border border-border sticky top-32">
                  <h3 className="text-xl font-bold mb-6 uppercase tracking-tight">Resumen</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({itemCount} productos)</span>
                      <span className="font-medium">${total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Envío (Malabo)</span>
                      <span className="text-primary font-bold">Gratis</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between items-end">
                      <span className="font-bold">Total</span>
                      <div className="text-right">
                        <p className="text-3xl font-black text-primary leading-none">
                          ${total.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">IVA incluido</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full rounded-full py-6 h-auto text-lg font-bold shadow-lg shadow-primary/20">
                    Finalizar Pedido
                  </Button>
                  
                  <p className="text-[10px] text-center text-muted-foreground mt-6 uppercase tracking-widest leading-relaxed">
                    Pagos seguros garantizados por BAH.DEN Elite Technology
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
