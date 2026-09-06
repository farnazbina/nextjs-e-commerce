"use client";

import Image from "next/image";
import Link from "next/link";
import { INITIAL_CART } from "@/lib/data/checkout";
import { getProduct } from "@/lib/data/catalog";
import { useState } from "react";
import { FiArrowLeft, FiCheck, FiEdit2, FiX } from "react-icons/fi";
import CheckoutProgress from "./CheckoutProgress";
import OrderSummary from "./OrderSummary";

const items = INITIAL_CART.flatMap((line) => {
  const product = getProduct(line.productId);
  return product ? [{ ...product, quantity: line.quantity }] : [];
});

export default function ReviewStep() {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-10 sm:px-6 lg:px-10"><div className="mb-10"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Final step</p><h1 className="mt-3 font-serif text-4xl text-stone-900 sm:text-5xl">Review order</h1></div><div className="grid items-start gap-10 lg:grid-cols-[1fr_360px] xl:gap-16"><div><CheckoutProgress currentStep={2} /><Link href="/submit-order/payment" className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-stone-500 transition hover:text-[#a9535e]"><FiArrowLeft className="size-4" />Back to payment</Link><p className="mt-8 text-sm font-semibold text-stone-900">Estimated delivery: September 12, 2026</p><div className="mt-4 border-y border-stone-200">{items.map((item) => <article key={item.name} className="flex items-center gap-4 border-b border-stone-200 py-4 last:border-0"><div className="relative size-20 bg-stone-100"><Image src={item.image} alt={item.name} fill sizes="80px" className="object-contain p-2 mix-blend-multiply" /></div><div><h2 className="text-sm font-medium">{item.name}</h2><p className="mt-1 text-sm text-[#c05f6b]">${item.price.toFixed(2)}</p><p className="mt-1 text-xs text-stone-400">QTY: 1</p></div></article>)}</div><ReviewBlock title="Shipping address" href="/submit-order"><p className="font-medium text-stone-900">Alexa Williams</p><p className="mt-2">4140 Parker Rd, Allentown, New Mexico 31134</p></ReviewBlock><ReviewBlock title="Payment method" href="/submit-order/payment"><p className="font-medium text-stone-900">Credit card</p><p className="mt-2">8291 3746 XX89 2635</p></ReviewBlock></div><OrderSummary subtotal={649} taxes={45.43} actionLabel="Place order" onAction={() => setConfirmed(true)} /></div>{confirmed && <div className="fixed inset-0 z-[120] grid place-items-center bg-stone-950/45 p-4" role="dialog" aria-modal="true" aria-labelledby="confirmed-title"><div className="relative w-full max-w-md bg-white p-8 text-center shadow-2xl sm:p-12"><button onClick={() => setConfirmed(false)} aria-label="Close confirmation" className="absolute right-4 top-4 grid size-9 place-items-center"><FiX /></button><span className="mx-auto grid size-16 place-items-center rounded-full bg-[#f9e5e7] text-[#c9747e] ring-8 ring-[#fcf2f3]"><FiCheck className="size-7" /></span><h2 id="confirmed-title" className="mt-7 font-serif text-3xl text-stone-900">Your order is confirmed</h2><p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-stone-500">Thanks for shopping! Your order hasn&apos;t shipped yet, but we&apos;ll email you when it does.</p><div className="mt-8 grid grid-cols-2 gap-3"><Link href="/" className="flex min-h-12 items-center justify-center border border-[#c9747e] text-xs font-semibold uppercase tracking-[0.08em] text-[#b85d68]">Back to home</Link><Link href="/orders" className="flex min-h-12 items-center justify-center bg-[#c9747e] text-xs font-semibold uppercase tracking-[0.08em] text-white">View order</Link></div></div></div>}</main>
  );
}

function ReviewBlock({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return <section className="relative border-b border-stone-200 py-6"><h2 className="mb-4 text-sm font-semibold text-stone-900">{title}</h2><div className="text-sm text-stone-500">{children}</div><Link href={href} aria-label={`Edit ${title}`} className="absolute right-0 top-1/2 grid size-9 place-items-center bg-stone-100 hover:bg-stone-200"><FiEdit2 className="size-4" /></Link></section>;
}
