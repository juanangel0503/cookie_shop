'use client';

import Header from '@/components/dashboard/Header';
import HeroCarousel from '@/components/dashboard/HeroCarousel';
import FeaturedCookies from '@/components/dashboard/FeaturedCookies';
import Footer from '@/components/dashboard/Footer';

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <Header />
      <main className="dashboard-main">
        <HeroCarousel />
        <FeaturedCookies />
      </main>
      <Footer />
    </div>
  );
}
