"use client";
import React, { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { cookieFlavors, packOptions } from '@/lib/data';
import { SelectedCookie } from '@/types';
import { useCart } from '@/lib/cart-context';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';

function CustomizeInner() {
  const params = useSearchParams();
  const router = useRouter();
  // Default to 4pack to match available options
  const packId = params.get('pack') || '4pack';
  const pack = useMemo(() => packOptions.find(p => p.id === packId) || packOptions[0], [packId]);
  const [items, setItems] = useState<SelectedCookie[]>([]);
  const { addToCart } = useCart();

  const totalSelected = items.reduce((s,i)=>s+i.quantity,0);
  const remaining = pack.size - totalSelected;

  const setQty = (flavorId:number, delta:number) => {
    setItems(prev => {
      const cur = prev.find(i=>i.id===flavorId)?.quantity || 0;
      const next = Math.max(0, Math.min(cur + delta, pack.size));
      const others = prev.filter(i=>i.id!==flavorId);
      return next===0 ? others : [...others, { id: flavorId, name: cookieFlavors.find(f=>f.id===flavorId)?.name || '', quantity: next }];
    });
  };

  const addPack = () => {
    if (remaining !== 0) return;
    const id = `pack_${Date.now()}`;
    addToCart({ id, packType: pack.id, packName: pack.name, packPrice: pack.price, packSize: pack.size, cookies: items, quantity: 1 });
    router.push('/checkout');
  };

  return (
    <div className="customize">
      <Header />

      <div className="customize-container">
        {/* Left Hero Panel */}
        <div className="hero-panel" aria-hidden>
          <div className="tray">
            <div className="tray-lip" />
            <div className="tray-shelf">
              {/* Simple cookie placeholders for visual balance */}
              <div className="cookie" />
              <div className="cookie" />
              <div className="cookie cookie-sprinkle" />
              <div className="cookie" />
            </div>
          </div>
        </div>

        {/* Right Selection Panel */}
        <div className="select-panel">
          <h1 className="select-title">Select {pack.size} Flavors</h1>

          <div className="flavors-list">
            {cookieFlavors.map(f => (
              <div key={f.id} className="flavor-row">
                <div className="flavor-main">
                  <div className="thumb" />
                  <div className="meta">
                    <div className="name">{f.name}</div>
                    <div className="calories">{f.calories}</div>
                  </div>
                </div>

                <div className="qty">
                  <button className="qty-btn" onClick={()=>setQty(f.id,-1)} disabled={(items.find(i=>i.id===f.id)?.quantity || 0)===0}>−</button>
                  <span className="qty-val">{items.find(i=>i.id===f.id)?.quantity || 0}</span>
                  <button className="qty-btn" onClick={()=> setQty(f.id, remaining>0 ? 1 : 0)} disabled={remaining===0}>＋</button>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Footer Bar */}
          <div className="action-bar">
            <div className="remaining">{remaining > 0 ? `Add ${remaining} More` : 'Ready'}</div>
            <button className="add-btn" disabled={remaining!==0} onClick={addPack}>
              Add to Bag
              <span className="price">${pack.price.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .customize { padding-top: 6rem; }
        .customize-container { max-width: 1280px; margin: 0 auto; padding: 0 2rem 2rem; display: grid; grid-template-columns: 1fr 520px; gap: 2rem; }

        /* Left hero resembling the screenshots */
        .hero-panel { background: rgb(255 185 205/var(--tw-bg-opacity)); --tw-bg-opacity: 1; border-radius: 18px; min-height: 560px; display:flex; align-items:center; justify-content:center; }
        .tray { width: 82%; max-width: 760px; aspect-ratio: 16/9; position: relative; }
        .tray-lip { position:absolute; top:8%; left:0; right:0; height:16%; background: rgba(255,255,255,0.6); border-radius: 14px; box-shadow: 0 6px 0 rgba(0,0,0,0.12) inset; }
        .tray-shelf { position:absolute; top:32%; left:4%; right:4%; bottom:16%; background: #fff; border-radius: 10px; box-shadow: 0 10px 0 rgba(0,0,0,0.12); display:flex; align-items:center; justify-content:space-around; padding: 0 1rem; }
        .cookie { width: 96px; height:96px; background:#e9c09f; border-radius: 50%; box-shadow: inset 0 6px 0 rgba(0,0,0,0.08); }
        .cookie-sprinkle { background: linear-gradient(145deg,#f8d7b6 0%,#f3caa2 100%); position: relative; }
        .cookie-sprinkle:after { content:''; position:absolute; inset:0; background: repeating-linear-gradient(45deg, rgba(255,255,255,0.8) 0 6px, transparent 6px 12px); mask: radial-gradient(circle at 50% 50%, #000 62%, transparent 63%); border-radius:50%; }

        /* Right selection */
        .select-panel { display:flex; flex-direction:column; }
        .select-title { font-size: 2.6rem; line-height: 1.1; font-weight: 900; margin: .5rem 0 1rem; }
        .flavors-list { overflow:auto; padding-right: .5rem; max-height: 520px; }
        .flavor-row { display:flex; justify-content:space-between; align-items:center; padding: 14px 4px; border-bottom: 1px solid #eee; }
        .flavor-main { display:flex; gap: 14px; align-items:center; }
        .thumb { width: 42px; height: 42px; background: #ffd9e6; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .meta { display:flex; flex-direction:column; }
        .name { font-weight: 800; }
        .calories { font-size:.85rem; color:#666; }
        .qty { display:flex; align-items:center; gap:10px; }
        .qty-btn { width: 42px; height: 42px; border-radius: 9999px; background: white; color: black; border: 2px solid #eee; font-weight: 900; font-size: 1.1rem; }
        .qty-btn:disabled { opacity:.5; }
        .qty-val { width: 22px; text-align:center; font-weight: 800; }

        .action-bar { position: sticky; bottom: 0; background: white; padding-top: 12px; margin-top: 12px; display:flex; gap: 12px; align-items:center; justify-content:space-between; border-top: 1px solid #eee; }
        .remaining { color:#666; font-weight:600; }
        .add-btn { display:flex; align-items:center; justify-content:center; gap: 10px; background:#2c2c2c; color:white; border:none; height: 56px; padding: 0 22px; border-radius: 9999px; font-weight: 800; }
        .add-btn:disabled { background:#bbb; }
        .price { background:white; color:#2c2c2c; border-radius: 9999px; padding: 8px 12px; font-weight: 800; }

        @media (max-width: 1024px) {
          .customize-container { grid-template-columns: 1fr; }
          .flavors-list { max-height: unset; }
        }
      `}</style>
      <Footer />
    </div>
  );
}

export default function Customize() {
  return (
    <Suspense fallback={<div style={{padding:'2rem'}}>Loading...</div>}>
      <CustomizeInner />
    </Suspense>
  );
}

