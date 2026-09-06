"use client";

import { useState } from "react";
import { CHECKOUT_ADDRESSES, CHECKOUT_TOTALS } from "@/lib/data/checkout";
import { FiMoreVertical, FiPhone, FiPlus, FiX } from "react-icons/fi";
import CheckoutProgress from "./CheckoutProgress";
import OrderSummary from "./OrderSummary";

const addresses = CHECKOUT_ADDRESSES;

export default function AddressStep() {
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <div className="mb-10"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Secure checkout</p><h1 className="mt-3 font-serif text-4xl text-stone-900 sm:text-5xl">Select address</h1></div>
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px] xl:gap-16">
        <div>
          <CheckoutProgress currentStep={0} />
          <section className="mt-12" aria-labelledby="default-address-title"><h2 id="default-address-title" className="mb-4 text-sm font-semibold text-stone-900">Default address</h2><AddressCard address={addresses[0]} selected={selectedAddress === 1} onSelect={setSelectedAddress} /></section>
          <section className="mt-8" aria-labelledby="other-address-title"><h2 id="other-address-title" className="mb-4 text-sm font-semibold text-stone-900">Other addresses</h2><div className="space-y-3">{addresses.slice(1).map((address) => <AddressCard key={address.id} address={address} selected={selectedAddress === address.id} onSelect={setSelectedAddress} />)}</div></section>
          <button type="button" onClick={() => setAddressModalOpen(true)} className="mt-7 inline-flex min-h-12 items-center gap-2 border border-[#c9747e] px-6 text-xs font-semibold uppercase tracking-[0.1em] text-[#b85d68] transition hover:bg-[#c9747e] hover:text-white"><FiPlus className="size-4" />Add new address</button>
        </div>
        <OrderSummary {...CHECKOUT_TOTALS} actionLabel="Continue" actionHref="/submit-order/payment" />
      </div>
      {addressModalOpen && <div className="fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-stone-950/45 p-4" role="dialog" aria-modal="true" aria-labelledby="new-address-title"><form onSubmit={(event) => { event.preventDefault(); setAddressModalOpen(false); }} className="relative my-6 w-full max-w-lg bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-center justify-between"><h2 id="new-address-title" className="font-serif text-2xl text-stone-900">Add new address</h2><button type="button" onClick={() => setAddressModalOpen(false)} aria-label="Close address form" className="grid size-9 place-items-center"><FiX /></button></div><div className="mt-7 grid gap-5"><Field label="Name" name="name" placeholder="Alexa Williams" /><Field label="Phone number" name="phone" type="tel" placeholder="(603) 555-0123" /><Field label="Address" name="address" placeholder="4140 Parker Rd, Allentown" /><div className="grid gap-5 sm:grid-cols-2"><Field label="City" name="city" placeholder="New Mexico" /><Field label="Country" name="country" placeholder="United States" /></div><fieldset><legend className="mb-3 text-xs font-medium text-stone-600">Save address as</legend><div className="flex gap-3"><label className="cursor-pointer"><input type="radio" name="type" value="home" defaultChecked className="peer sr-only" /><span className="block border border-[#c9747e] px-4 py-2 text-xs font-semibold uppercase text-[#b85d68] peer-checked:bg-[#c9747e] peer-checked:text-white">Home</span></label><label className="cursor-pointer"><input type="radio" name="type" value="work" className="peer sr-only" /><span className="block border border-[#c9747e] px-4 py-2 text-xs font-semibold uppercase text-[#b85d68] peer-checked:bg-[#c9747e] peer-checked:text-white">Work</span></label></div></fieldset><button type="submit" className="mt-2 min-h-12 bg-[#c9747e] text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#a9535e]">Add address</button></div></form></div>}
    </main>
  );
}

function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) {
  return <label className="block"><span className="mb-2 block text-xs font-medium text-stone-600">{label}</span><input type={type} name={name} required placeholder={placeholder} className="min-h-12 w-full border border-stone-200 px-4 text-sm outline-none focus:border-[#c9747e]" /></label>;
}

function AddressCard({ address, selected, onSelect }: { address: (typeof addresses)[number]; selected: boolean; onSelect: (id: number) => void }) {
  return (
    <label className={`flex cursor-pointer items-start gap-4 border p-5 transition ${selected ? "border-[#c9747e] bg-[#fffafa]" : "border-stone-200 hover:border-stone-400"}`}>
      <input type="radio" name="address" checked={selected} onChange={() => onSelect(address.id)} className="mt-1 size-4 accent-[#c9747e]" />
      <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2 text-sm font-medium text-stone-900">{address.name}{address.home && <span className="bg-[#c9747e] px-2 py-1 text-[9px] font-semibold uppercase text-white">Home</span>}</span><span className="mt-2 block text-xs leading-5 text-stone-500">{address.address}</span><span className="mt-1 flex items-center gap-2 text-xs text-stone-500"><FiPhone className="size-3" />{address.phone}</span></span>
      <button type="button" aria-label={`More options for ${address.name}`} className="grid size-9 shrink-0 place-items-center border border-stone-200 text-stone-500 hover:bg-stone-100"><FiMoreVertical /></button>
    </label>
  );
}
