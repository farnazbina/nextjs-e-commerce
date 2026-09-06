import Link from "next/link";
import { FiArrowRight, FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { FaPinterestP } from "react-icons/fa";

const footerGroups = [
  {
    title: "Shop",
    links: ["All jewelry", "Rings", "Necklaces", "Earrings", "Bracelets", "Watches"],
  },
  {
    title: "About",
    links: ["Our story", "Craftsmanship", "Sustainability", "Press", "Careers"],
  },
  {
    title: "Help",
    links: ["FAQs", "Shipping & delivery", "Returns & exchanges", "Size guide", "Contact us"],
  },
];

const toHref = (label: string) => `/${label.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}`;

export default function Footer() {
  return (
    <footer className="bg-[#f7f2ed] text-stone-700">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 sm:py-20 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.9fr_1.5fr] lg:px-10">
        <div>
          <Link href="/" className="inline-block text-stone-900" aria-label="Lumière home">
            <span className="block text-center text-xs text-[#9b7440]">◇</span>
            <span className="font-serif text-3xl tracking-[0.18em] sm:text-4xl">LUMIÈRE</span>
            <span className="mt-1 block text-center text-[10px] font-semibold uppercase tracking-[0.32em]">Fine jewelry</span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-6 text-stone-500">Timeless designs. Unmatched quality.<br />Made to be cherished forever.</p>
          <div className="mt-7 flex gap-3">
            {[
              { label: "Instagram", href: "#", icon: FiInstagram },
              { label: "Facebook", href: "#", icon: FiFacebook },
              { label: "Pinterest", href: "#", icon: FaPinterestP },
              { label: "YouTube", href: "#", icon: FiYoutube },
            ].map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} aria-label={label} className="grid size-9 place-items-center rounded-full border border-stone-300 transition hover:border-stone-900 hover:bg-stone-900 hover:text-white"><Icon className="size-4" aria-hidden="true" /></a>
            ))}
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-stone-900">{group.title}</h2>
            <ul className="mt-6 space-y-3">
              {group.links.map((link) => <li key={link}><Link href={toHref(link)} className="text-sm text-stone-500 transition hover:text-stone-900">{link}</Link></li>)}
            </ul>
          </div>
        ))}

        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-stone-900">Newsletter</h2>
          <p className="mt-6 max-w-sm text-sm leading-6 text-stone-500">Be the first to know about new collections and exclusive offers.</p>
          <form className="mt-6 flex border border-stone-300 bg-transparent" action="#">
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input id="footer-email" name="email" type="email" required placeholder="Enter your email" className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm text-stone-900 outline-none placeholder:text-stone-400" />
            <button type="submit" aria-label="Subscribe to newsletter" className="grid w-14 place-items-center border-l border-stone-300 transition hover:bg-stone-900 hover:text-white"><FiArrowRight className="size-5" aria-hidden="true" /></button>
          </form>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>© 2026 Lumière Fine Jewelry. All rights reserved.</p>
          <div className="flex gap-6"><Link href="/privacy-policy" className="hover:text-stone-900">Privacy Policy</Link><Link href="/terms" className="hover:text-stone-900">Terms &amp; Conditions</Link></div>
        </div>
      </div>
    </footer>
  );
}
