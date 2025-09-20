import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

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
      <body className={poppins.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
