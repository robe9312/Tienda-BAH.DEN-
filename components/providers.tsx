'use client';

import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <ThemeProvider defaultTheme="dark" switchable={false}>
          <CartProvider>
            <TooltipProvider>
              {children}
              <Toaster position="top-right" theme="dark" />
            </TooltipProvider>
          </CartProvider>
        </ThemeProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}
