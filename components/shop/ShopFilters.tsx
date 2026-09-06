import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/data/catalog";

type ShopFiltersProps = {
  selected: string[];
  onToggle: (category: string) => void;
  maxPrice: number;
  onPriceChange: (price: number) => void;
};

export default function ShopFilters({ selected, onToggle, maxPrice, onPriceChange }: ShopFiltersProps) {
  return (
    <div className="space-y-8">
      <FilterGroup title="Categories">
        {PRODUCT_CATEGORIES.map((category) => (
          <label key={category} className="flex cursor-pointer items-center gap-3 text-sm text-stone-600">
            <input type="checkbox" checked={selected.includes(category)} onChange={() => onToggle(category)} className="size-4 accent-[#7c2831]" />
            <span>{category}</span>
            <span className="ml-auto text-xs text-stone-400">({PRODUCTS.filter((product) => product.category === category).length})</span>
          </label>
        ))}
      </FilterGroup>
      <FilterGroup title="Material">
        {["Yellow gold", "Rose gold", "White gold", "Sterling silver"].map((material, index) => (
          <label key={material} className="flex cursor-pointer items-center gap-3 text-sm text-stone-600"><input type="checkbox" className="size-4 accent-[#7c2831]" /><span className={`size-3 rounded-full border ${index === 0 ? "bg-[#d3ad58]" : index === 1 ? "bg-[#d7a28d]" : index === 2 ? "bg-stone-100" : "bg-stone-300"}`} />{material}</label>
        ))}
      </FilterGroup>
      <FilterGroup title="Price range">
        <div className="mb-4 flex justify-between text-xs text-stone-500"><span>$0</span><span>${maxPrice}</span></div>
        <input type="range" min="100" max="500" step="10" value={maxPrice} onChange={(event) => onPriceChange(Number(event.target.value))} className="w-full accent-[#7c2831]" aria-label="Maximum price" />
      </FilterGroup>
      <FilterGroup title="Availability"><label className="flex cursor-pointer items-center gap-3 text-sm text-stone-600"><input type="checkbox" className="size-4 accent-[#7c2831]" />In stock only</label></FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="border-t border-stone-200 pt-7 first:border-0 first:pt-0"><h2 className="mb-5 text-sm font-semibold text-stone-900">{title}</h2><div className="space-y-3">{children}</div></section>;
}
