import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiShoppingBag } from "react-icons/fi";

const products = [
  { name: "Lumière Twist Ring", price: "$189.00", image: "/images/products/twist-ring.png", href: "/products/lumiere-twist-ring" },
  { name: "Stellar Gold Hoops", price: "$245.00", image: "/images/products/stellar-hoops.png", href: "/products/stellar-gold-hoops" },
  { name: "Élan Tennis Bracelet", price: "$420.00", image: "/images/products/tennis-bracelet.png", href: "/products/elan-tennis-bracelet" },
  { name: "Petite Pearl Necklace", price: "$215.00", image: "/images/products/pearl-necklace.png", href: "/products/petite-pearl-necklace" },
];

export default function BestSellers() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-6 sm:px-6 sm:pb-28 lg:px-10" aria-labelledby="best-sellers-title">
      <div className="mb-10 flex items-end justify-between gap-5 sm:mb-14">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Most loved</p>
          <h2 id="best-sellers-title" className="text-3xl font-medium tracking-[-0.03em] text-stone-900 sm:text-5xl">Best sellers</h2>
        </div>
        <Link href="/products" className="group inline-flex items-center gap-2 border-b border-stone-900 pb-1 text-sm font-semibold uppercase tracking-[0.12em] text-stone-900">View all <FiArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <article key={product.name} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-stone-100">
              <Link href={product.href} aria-label={`View ${product.name}`} className="absolute inset-0 z-10">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-contain p-5 mix-blend-multiply transition-transform duration-500 group-hover:scale-105 sm:p-8" />
              </Link>
              <button type="button" aria-label={`Add ${product.name} to favorites`} className="absolute right-3 top-3 z-20 grid size-10 translate-y-2 place-items-center rounded-full bg-white text-stone-900 opacity-0 shadow-sm transition-all hover:bg-stone-900 hover:text-white group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 sm:right-5 sm:top-5"><FiHeart className="size-4" aria-hidden="true" /></button>
              <button type="button" className="absolute bottom-3 left-3 right-3 z-20 flex min-h-12 translate-y-3 items-center justify-center gap-2 rounded-full bg-stone-900 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition-all hover:bg-stone-700 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 sm:bottom-5 sm:left-5 sm:right-5 sm:text-sm"><FiShoppingBag className="size-4" aria-hidden="true" />Add to cart</button>
            </div>
            <Link href={product.href} className="mt-4 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900">
              <h3 className="text-sm font-medium text-stone-900 sm:text-base">{product.name}</h3>
              <p className="mt-1 text-sm text-stone-500">{product.price}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
