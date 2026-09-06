"use client";

import Image from "next/image";
import Link from "next/link";
import { INITIAL_CART } from "@/lib/data/checkout";
import { getProduct } from "@/lib/data/catalog";
import { useMemo, useState } from "react";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";

const initialItems = INITIAL_CART.flatMap((line) => {
  const product = getProduct(line.productId);
  return product ? [{ ...product, quantity: line.quantity }] : [];
});

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item));
  };
  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);
  const discount = couponApplied ? Math.min(40, subtotal) : 0;
  const total = subtotal - discount;

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-24 sm:px-6 lg:px-10">
           <nav className="py-7 text-xs uppercase tracking-[0.12em] text-stone-400" aria-label="Breadcrumb"><Link href="/">Home</Link><span className="px-2">/</span><span className="text-stone-700">Shopping cart</span></nav>
      <div className="mb-10 border-b border-stone-200 pb-8"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Your selection</p><h1 className="mt-3 font-serif text-4xl text-stone-900 sm:text-6xl">Shopping cart</h1></div>

      {items.length ? (
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px] xl:gap-16">
          <section aria-label="Cart items">
            <div className="hidden grid-cols-[1fr_110px_150px_100px] bg-[#d7ad61] px-5 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#2e2117] sm:grid"><span>Product</span><span>Price</span><span>Quantity</span><span className="text-right">Subtotal</span></div>
            <div>
              {items.map((item) => (
                <article key={item.id} className="grid grid-cols-[88px_1fr_auto] gap-4 border-b border-stone-200 py-6 sm:grid-cols-[1fr_110px_150px_100px] sm:items-center sm:px-5">
                  <div className="contents sm:flex sm:items-center sm:gap-5">
                    <div className="relative aspect-square w-[88px] bg-stone-100"><Image src={item.image} alt={item.name} fill sizes="88px" className="object-contain p-2 mix-blend-multiply" /></div>
                    <div className="self-center"><Link href={`/products/${item.id}`} className="text-sm font-semibold text-stone-900 hover:text-[#7c2831] sm:text-base">{item.name}</Link><p className="mt-2 text-xs text-stone-400">{item.category} · {item.material}</p><p className="mt-2 text-sm font-medium text-[#7c2831] sm:hidden">${item.price.toFixed(2)}</p></div>
                  </div>
                  <p className="hidden text-sm text-stone-700 sm:block">${item.price.toFixed(2)}</p>
                  <div className="col-start-2 mt-2 inline-flex h-10 w-fit items-center border border-stone-200 sm:col-auto sm:mt-0"><button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`} className="grid h-full w-10 place-items-center hover:bg-stone-100"><FiMinus className="size-3" /></button><span className="grid h-full w-10 place-items-center border-x border-stone-200 text-sm">{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`} className="grid h-full w-10 place-items-center hover:bg-stone-100"><FiPlus className="size-3" /></button></div>
                  <div className="col-start-3 row-start-1 flex h-full flex-col items-end justify-between sm:col-auto sm:row-auto sm:h-auto"><button type="button" onClick={() => setItems((current) => current.filter((product) => product.id !== item.id))} aria-label={`Remove ${item.name}`} className="text-stone-400 transition hover:text-[#7c2831] sm:hidden"><FiTrash2 /></button><p className="text-sm font-semibold text-stone-900">${(item.price * item.quantity).toFixed(2)}</p><button type="button" onClick={() => setItems((current) => current.filter((product) => product.id !== item.id))} className="mt-2 hidden text-xs text-stone-400 underline hover:text-[#7c2831] sm:block">Remove</button></div>
                </article>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <form onSubmit={(event) => { event.preventDefault(); if (coupon.trim()) setCouponApplied(true); }} className="flex max-w-md"><label htmlFor="coupon" className="sr-only">Coupon code</label><input id="coupon" value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Coupon code" className="min-w-0 flex-1 border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-500" /><button type="submit" className="bg-[#4a1c0b] px-6 text-xs font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#321207]">Apply coupon</button></form>
              <button type="button" onClick={() => setItems([])} className="w-fit text-sm text-stone-700 underline underline-offset-4 hover:text-[#7c2831]">Clear shopping cart</button>
            </div>
            {couponApplied && <p className="mt-3 text-sm text-emerald-700">Coupon applied successfully.</p>}
          </section>

          <aside className="border border-stone-200 p-6 sm:p-8 lg:sticky lg:top-8" aria-labelledby="order-summary-title">
            <h2 id="order-summary-title" className="font-serif text-2xl text-stone-900">Order summary</h2>
            <div className="mt-6 space-y-4 border-y border-stone-200 py-6 text-sm"><div className="flex justify-between text-stone-500"><span>Items</span><span>{items.reduce((count, item) => count + item.quantity, 0)}</span></div><div className="flex justify-between text-stone-500"><span>Subtotal</span><span className="text-stone-900">${subtotal.toFixed(2)}</span></div><div className="flex justify-between text-stone-500"><span>Shipping</span><span className="text-stone-900">Free</span></div><div className="flex justify-between text-stone-500"><span>Taxes</span><span className="text-stone-900">Calculated at checkout</span></div>{couponApplied && <div className="flex justify-between text-emerald-700"><span>Coupon discount</span><span>−${discount.toFixed(2)}</span></div>}</div>
            <div className="flex justify-between py-6 text-base font-semibold text-stone-900"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <Link href="/submit-order" className="flex min-h-12 items-center justify-center bg-[#4a1c0b] px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#321207]">Proceed to checkout</Link>
            <Link href="/products" className="mt-4 block text-center text-xs font-semibold uppercase tracking-[0.1em] text-stone-500 hover:text-stone-900">Continue shopping</Link>
          </aside>
        </div>
      ) : (
        <div className="grid min-h-[420px] place-items-center bg-stone-50 text-center"><div><FiShoppingBag className="mx-auto size-10 text-stone-300" /><h2 className="mt-5 font-serif text-3xl text-stone-900">Your cart is empty</h2><p className="mt-3 text-sm text-stone-500">Discover something special to add to your collection.</p><Link href="/products" className="mt-7 inline-flex min-h-12 items-center bg-[#7c2831] px-7 text-xs font-semibold uppercase tracking-[0.12em] text-white">Shop jewelry</Link></div></div>
      )}
    </main>
  );
}
