"use client";

import Link from "next/link";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import ProductSearch from "./ProductSearch";
import {
  FiHeart,
  FiMenu,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";

const navItems = [
  { label: "Rings", href: "/products?category=Rings" },
  { label: "Earrings", href: "/products?category=Earrings" },
  { label: "Bracelets", href: "/products?category=Bracelets" },
  { label: "Pendants", href: "/products?category=Pendants" },
  { label: "Necklaces", href: "/products?category=Necklaces" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-[#e8e0d7] bg-[#fbf7f1] text-[#18372f]">
      <div className="h-2 bg-[#153b32]" />

      <div className="mx-auto grid min-h-20 w-full max-w-[1536px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:min-h-[110px] lg:px-10">
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.11em] transition hover:text-[#9b7440]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid size-11 place-items-center justify-self-start xl:hidden"
        >
          <FiMenu className="size-5" aria-hidden="true" />
        </button>

        <Link
          href="/"
          className="group text-center text-[#18372f]"
          aria-label="Lumière Fine Jewelry home"
        >
          <span className="block text-lg leading-none text-[#b08a4b] transition group-hover:rotate-12 sm:text-xl">
            ◇
          </span>
          <span className="mt-1 block font-serif text-2xl tracking-[0.22em] sm:text-3xl lg:text-[2rem]">
            LUMIÈRE
          </span>
          <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.42em] sm:block">
            Fine Jewelry
          </span>
        </Link>

        <div className="flex items-center justify-self-end lg:gap-6 xl:gap-7">
          <ProductSearch />
          <Link href="/auth/login" className="group hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition hover:text-[#9b7440] lg:flex">
            <FiUser className="size-5 stroke-[1.5]" aria-hidden="true" />
            Account
          </Link>
          <Link href="/wishlist" className="group hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition hover:text-[#9b7440] xl:flex">
            <FiHeart className="size-5 stroke-[1.5]" aria-hidden="true" />
            Wishlist
          </Link>
          <button type="button" onClick={() => setCartOpen(true)} aria-label="Open shopping cart, 2 items" className="group flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition hover:text-[#9b7440]">
            <FiShoppingBag className="size-5 stroke-[1.5]" aria-hidden="true" />
            <span className="hidden lg:inline">Cart (2)</span>
            <span className="lg:hidden">2</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-[#e8e0d7] px-4 py-5 xl:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-[1536px] gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-[#e8e0d7] py-4 text-xs font-semibold uppercase tracking-[0.12em] last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-6">
              <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-3 text-xs font-semibold uppercase"><FiUser />Account</Link>
            </div>
          </div>
        </nav>
      )}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
