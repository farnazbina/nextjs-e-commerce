"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { CHECKOUT_TOTALS } from "@/lib/data/checkout";
import CheckoutProgress from "./CheckoutProgress";
import OrderSummary from "./OrderSummary";

export default function PaymentStep() {
  const [method, setMethod] = useState<"card" | "paypal">("card");

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <div className="mb-10"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Secure checkout</p><h1 className="mt-3 font-serif text-4xl text-stone-900 sm:text-5xl">Payment method</h1></div>
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px] xl:gap-16"><div><CheckoutProgress currentStep={1} /><Link href="/submit-order" className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-stone-500 transition hover:text-[#a9535e]"><FiArrowLeft className="size-4" />Back to address</Link><section className="mt-8"><label className="flex cursor-pointer items-center gap-3 text-sm font-medium"><input type="radio" checked={method === "card"} onChange={() => setMethod("card")} className="accent-[#c9747e]" />Credit/debit card</label>{method === "card" && <div className="mt-6 grid gap-5 sm:grid-cols-2"><PaymentField label="Card number" placeholder="8291 3746 XX89 2635" /><PaymentField label="Card holder name" placeholder="Alexa Williams" /><PaymentField label="Expiry date" placeholder="12/2028" /><PaymentField label="CVC" placeholder="••••" /></div>}<label className="mt-8 flex cursor-pointer items-center gap-3 text-sm font-medium"><input type="radio" checked={method === "paypal"} onChange={() => setMethod("paypal")} className="accent-[#c9747e]" />PayPal</label>{method === "paypal" && <p className="mt-4 border border-stone-200 bg-stone-50 p-5 text-sm text-stone-500">You will be redirected to PayPal securely after continuing.</p>}</section></div><OrderSummary {...CHECKOUT_TOTALS} actionLabel="Continue" actionHref="/submit-order/review" /></div>
    </main>
  );
}

function PaymentField({ label, placeholder }: { label: string; placeholder: string }) {
  return <label><span className="mb-2 block text-xs text-stone-500">{label}</span><input required placeholder={placeholder} className="min-h-12 w-full border border-stone-200 px-4 text-sm outline-none focus:border-[#c9747e]" /></label>;
}
