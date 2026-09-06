import {
  FiAward,
  FiCreditCard,
  FiHeadphones,
  FiRefreshCcw,
} from "react-icons/fi";

const benefits = [
  {
    title: "Easy returns",
    description: "30-day return policy",
    icon: FiRefreshCcw,
  },
  {
    title: "Secure payment",
    description: "100% secure checkout",
    icon: FiCreditCard,
  },
  {
    title: "Exceptional quality",
    description: "Crafted with precision",
    icon: FiAward,
  },
  {
    title: "Dedicated support",
    description: "24/7 customer support",
    icon: FiHeadphones,
  },
];

export default function StoreBenefits() {
  return (
    <section className="border-y border-stone-200 bg-white" aria-label="Store benefits">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-10">
        {benefits.map(({ title, description, icon: Icon }, index) => (
          <div
            key={title}
            className={`flex items-center gap-5 border-stone-200 py-8 sm:px-7 lg:py-10 ${
              index > 0 ? "border-t sm:border-t-0 lg:border-l" : ""
            } ${index === 2 ? "sm:border-t lg:border-t-0" : ""} ${
              index === 1 || index === 3 ? "sm:border-l" : ""
            }`}
          >
            <Icon className="size-9 shrink-0 stroke-[1.25] text-[#9b7440]" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-semibold capitalize text-stone-900 sm:text-base">{title}</h2>
              <p className="mt-1 text-sm text-stone-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
