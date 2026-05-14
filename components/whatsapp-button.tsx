'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function WhatsAppButton({ className, variant = "default", size = "lg" }: WhatsAppButtonProps) {
  const { items, total } = useCart();

  const handleWhatsAppClick = () => {
    const phoneNumber = '240555123456'; // Reemplazar con el número real
    let message = 'Hola BAH.DEN, ';

    if (items.length > 0) {
      message += 'estoy interesado en comprar:\n\n';
      items.forEach(item => {
        message += `- ${item.quantity}x ${item.name} ($${item.price})\n`;
      });
      message += `\nTotal: $${total}\n\n¿Están disponibles en la tienda de Malabo?`;
    } else {
      message += 'me gustaría obtener más información sobre sus productos de élite.';
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <Button 
      variant={variant}
      size={size}
      className={className}
      onClick={handleWhatsAppClick}
    >
      <MessageCircle className="mr-2 size-5" />
      Contactar por WhatsApp
    </Button>
  );
}
