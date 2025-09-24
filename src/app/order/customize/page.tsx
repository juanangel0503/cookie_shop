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
  const packId = params.get('pack') || 'four_pack';
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

  const gridCols = useMemo(()=> {
    // Square box layout like Crumbl
    if (pack.size === 12) return 4; // 3x4 or 4x3
    if (pack.size === 6) return 3;  // 2x3
    if (pack.size === 4) return 2;  // 2x2
    return Math.min(4, Math.ceil(Math.sqrt(pack.size)));
  }, [pack.size]);

  const addPack = () => {
    if (remaining !== 0) return;
    const id = `pack_${Date.now()}`;
    addToCart({ id, packType: pack.id, packName: pack.name, packPrice: pack.price, packSize: pack.size, cookies: items, quantity: 1 });
    router.push('/checkout');
  };

  return (
    <div className="customize">
      <Header />
      <div className="container">
        <h1 className="title">Customize your {pack.name}</h1>
        <p className="subtitle">Select exactly {pack.size} cookies. Remaining: {remaining}</p>

        <div className="grid" style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
          {Array.from({ length: pack.size }).map((_, idx) => {
            const slot = items[idx];
            return (
              <div key={idx} className="slot">
                <span className="slot-index">{idx+1}</span>
              </div>
            );
          })}
        </div>

        <div className="flavors">
          {cookieFlavors.map(f => (
            <div key={f.id} className="flavor">
              <div className="flavor-info">
                <span className="emoji">🍪</span>
                <div>
                  <div className="name">{f.name}</div>
                  <div className="desc">{f.description}</div>
                </div>
              </div>
              <div className="qty">
                <button onClick={()=>setQty(f.id,-1)} disabled={items.find(i=>i.id===f.id)?.quantity===0}>-</button>
                <span>{items.find(i=>i.id===f.id)?.quantity || 0}</span>
                <button onClick={()=> setQty(f.id, remaining>0 ? 1 : 0)} disabled={remaining===0}>+</button>
              </div>
            </div>
          ))}
        </div>

        <button className="add" disabled={remaining!==0} onClick={addPack}>Add to bag</button>
      </div>

      <style jsx>{`
        .customize { padding: 3rem 0; padding-top: 6rem; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
        .title { font-size: 2rem; font-weight: 800; }
        .subtitle { color: var(--text-light); margin: .5rem 0 2rem; }
        .grid { display:grid; gap: 12px; background: var(--background-light); padding: 16px; border-radius: 16px; margin-bottom: 2rem; }
        .slot { background: white; border: 2px dashed var(--border); border-radius: 10px; height: 110px; position: relative; }
        .slot-index { position:absolute; top:6px; left:8px; color: var(--text-light); font-weight: 600; }
        .flavors { display:flex; flex-direction: column; gap: 10px; }
        .flavor { display:flex; justify-content: space-between; align-items: center; background: white; border:1px solid var(--border); border-radius: 12px; padding: 12px 16px; }
        .flavor-info { display:flex; gap: 12px; align-items: center; max-width: 70%; }
        .emoji { font-size: 24px; }
        .name { font-weight: 700; }
        .desc { color: var(--text-light); font-size: .9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .qty { display:flex; gap: 8px; align-items:center; }
        .qty button { width: 36px; height: 36px; border-radius: 9999px; background: var(--primary-pink); color:white; border:none; font-weight: 800; }
        .add { margin-top: 1.5rem; width: 100%; padding: 14px; border-radius: 9999px; background: var(--gradient-primary); color:white; border:none; font-weight: 800; }
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

