'use client';

import Link from 'next/link';
import { packOptions } from '@/lib/data';

export default function OrderMenu() {
  return (
    <div className="order-menu">
      <div className="container">
        <h1 className="title">Choose your pack</h1>
        <div className="packs">
          {packOptions.map((pack) => (
            <Link key={pack.id} href={`/order/customize?pack=${pack.id}`} className="pack-card">
              <div className="pack-name">{pack.name}</div>
              <div className="pack-size">{pack.size} cookies</div>
              <div className="pack-price">${pack.price.toFixed(2)}</div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .order-menu { padding: 3rem 0; }
        .container { max-width: 1000px; margin: 0 auto; padding: 0 2rem; }
        .title { font-size: 2rem; font-weight: 800; margin-bottom: 2rem; }
        .packs { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; }
        .pack-card { background: white; border: 2px solid var(--border); border-radius: 16px; padding: 1.5rem; text-decoration:none; color: inherit; transition: var(--transition); }
        .pack-card:hover { border-color: var(--primary-pink); transform: translateY(-4px); }
        .pack-name { font-weight: 800; font-size: 1.2rem; margin-bottom:.25rem; }
        .pack-size { color: var(--text-light); margin-bottom:.5rem; }
        .pack-price { color: var(--primary-pink); font-weight: 800; }
      `}</style>
    </div>
  );
}

