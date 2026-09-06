"use client";

import Image from "next/image";
import Link from "next/link";
import { INITIAL_CART } from "@/lib/data/checkout";
import { getProduct } from "@/lib/data/catalog";
import { useEffect } from "react";
import { FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi";

const cartItems = INITIAL_CART.flatMap((line) => {
  const product = getProduct(line.productId);
  return product ? [{ ...product, quantity: line.quantity }] : [];
});

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, open]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div
      className={`fixed inset-0 z-[100] transition-visibility duration-300 ${
        open ? "visible" : "invisible"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close shopping cart"
        onClick={onClose}
        className={`absolute inset-0 bg-stone-950/45 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        tabIndex={open ? 0 : -1}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`absolute bottom-0 left-0 right-0 flex max-h-[85dvh] flex-col rounded-t-[1.75rem] bg-white shadow-2xl transition-transform duration-300 ease-out lg:bottom-auto lg:left-auto lg:top-0 lg:h-full lg:max-h-none lg:w-[440px] lg:rounded-none ${
          open
            ? "translate-y-0 lg:translate-x-0"
            : "translate-y-full lg:translate-x-full lg:translate-y-0"
        }`}
      >
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-stone-300 lg:hidden" />
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-5 sm:px-7 lg:py-6">
          <div>
            <h2 id="cart-title" className="font-serif text-2xl text-stone-900">
              Your cart
            </h2>
            <p className="mt-1 text-xs text-stone-500">
              You have {cartItems.length} items in your cart
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping cart"
            className="grid size-10 place-items-center rounded-full transition hover:bg-stone-100"
          >
            <FiX className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-7">
          {cartItems.map((item) => (
            <article
              key={item.id}
              className="grid grid-cols-[88px_1fr_auto] gap-4 border-b border-stone-200 py-5"
            >
              <Link
                href={`/products/${item.id}`}
                onClick={onClose}
                className="relative aspect-square overflow-hidden bg-stone-100"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="88px"
                  className="object-contain p-2 mix-blend-multiply"
                />
              </Link>
              <div>
                <Link
                  href={`/products/${item.id}`}
                  onClick={onClose}
                  className="text-sm font-medium text-stone-900 hover:text-[#7c2831]"
                >
                  {item.name}
                </Link>
                <p className="mt-2 text-sm font-semibold text-[#7c2831]">
                  ${item.price.toFixed(2)}
                </p>
                <div className="mt-3 inline-flex h-8 items-center border border-stone-200">
                  <button type="button" aria-label={`Decrease ${item.name} quantity`} className="grid h-full w-8 place-items-center hover:bg-stone-100"><FiMinus className="size-3" /></button>
                  <span className="grid h-full w-8 place-items-center border-x border-stone-200 text-xs">{item.quantity}</span>
                  <button type="button" aria-label={`Increase ${item.name} quantity`} className="grid h-full w-8 place-items-center hover:bg-stone-100"><FiPlus className="size-3" /></button>
                </div>
              </div>
              <button type="button" aria-label={`Remove ${item.name}`} className="grid size-8 place-items-center text-stone-400 transition hover:text-[#7c2831]"><FiTrash2 className="size-4" /></button>
            </article>
          ))}
        </div>

        <div className="border-t border-stone-200 bg-white p-5 sm:p-7">
          <div className="flex items-center justify-between text-sm font-semibold text-stone-900">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <p className="mt-2 text-xs text-stone-400">
            Taxes and shipping calculated at checkout.
          </p>
          <div className="mt-5 grid gap-3">
            <Link href="/cart" onClick={onClose} className="flex min-h-12 items-center justify-center border border-[#7c2831] text-xs font-semibold uppercase tracking-[0.12em] text-[#7c2831] transition hover:bg-[#7c2831] hover:text-white">View cart</Link>
            <Link href="/submit-order" onClick={onClose} className="flex min-h-12 items-center justify-center bg-[#7c2831] text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#641f27]">Checkout</Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
