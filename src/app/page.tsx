'use client';

import Header from '@/components/dashboard/Header';
import HeroCarousel from '@/components/dashboard/HeroCarousel';
import FeaturedCookies from '@/components/dashboard/FeaturedCookies';
import Footer from '@/components/dashboard/Footer';

export default function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <main className="home-main">
        <HeroCarousel />
        <FeaturedCookies />
      </main>
      <Footer />
    </div>
  );
}
