import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';

export const metadata: Metadata = {
  title: 'Happily Ever Bakers - Artisan Cookie Shop',
  description: 'Handcrafted cookies made daily with premium ingredients, delivered fresh to your door',
  keywords: 'cookies, artisan, bakery, delivery, fresh baked, premium ingredients',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
