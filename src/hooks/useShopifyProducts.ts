import { useQuery } from "@tanstack/react-query";
import {
  storefrontApiRequest,
  normalizeProduct,
  PRODUCTS_QUERY,
  type ShopifyProduct,
  type ShopifyProductNode,
} from "@/lib/shopify";

interface ProductsQueryData {
  products: { edges: { node: ShopifyProductNode }[] };
}

async function fetchProducts(): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest<ProductsQueryData>(PRODUCTS_QUERY, {
    first: 20,
  });
  return data.products.edges.map((e) => normalizeProduct(e.node));
}

export function useShopifyProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });

  const products = data ?? [];

  const getByHandle = (handle: string): ShopifyProduct | undefined =>
    products.find((p) => p.handle === handle);

  return { products, getByHandle, isLoading, error };
}
