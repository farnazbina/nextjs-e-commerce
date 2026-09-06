import ProductDetails from "@/components/shop/ProductDetails";
import { PRODUCTS } from "@/lib/data/catalog";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: String(product.id) }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetails productId={id} />;
}
