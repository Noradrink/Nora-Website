import { useMemo } from "react";
import { useShopifyProducts } from "./useShopifyProducts";
import {
  productEditorial,
  productOrder,
  type PackSize,
  type ProductEditorial,
} from "@/lib/products";
import { formatMoney, type ShopifyProduct } from "@/lib/shopify";

export interface PackVariant {
  packSize: PackSize;
  variantId: string | null;
  price: number | null;
  priceFormatted: string;
  pricePerCan: string;
  available: boolean;
}

export interface MergedProduct {
  handle: string;
  editorial: ProductEditorial;
  image: string;
  shopifyImages: string[];
  variants: PackVariant[];
  defaultVariant: PackVariant;
}

function buildPackVariant(
  packSize: PackSize,
  shopifyProduct: ShopifyProduct | undefined,
): PackVariant {
  const firstVariant = shopifyProduct?.variants?.[0];
  if (!shopifyProduct || !firstVariant) {
    return {
      packSize,
      variantId: null,
      price: null,
      priceFormatted: "",
      pricePerCan: "",
      available: false,
    };
  }

  const amount = parseFloat(firstVariant.price.amount);
  const perCan = amount / packSize;

  return {
    packSize,
    variantId: firstVariant.id,
    price: amount,
    priceFormatted: formatMoney(firstVariant.price),
    pricePerCan: formatMoney({
      amount: perCan.toFixed(2),
      currencyCode: firstVariant.price.currencyCode,
    }),
    available: firstVariant.availableForSale,
  };
}

function mergeOne(
  editorial: ProductEditorial,
  getByHandle: (h: string) => ShopifyProduct | undefined,
): MergedProduct {
  const six = getByHandle(editorial.shopifyHandles[6]);
  const twelve = getByHandle(editorial.shopifyHandles[12]);

  const variants: PackVariant[] = [
    buildPackVariant(6, six),
    buildPackVariant(12, twelve),
  ];

  const shopifyImages = [
    ...(six?.images.map((i) => i.url) ?? []),
    ...(twelve?.images.map((i) => i.url) ?? []),
  ];

  return {
    handle: editorial.handle,
    editorial,
    image: shopifyImages[0] ?? editorial.fallbackImage,
    shopifyImages,
    variants,
    defaultVariant: variants[0],
  };
}

export function useMergedProducts() {
  const { getByHandle, isLoading, error, products } = useShopifyProducts();

  const merged = useMemo<MergedProduct[]>(() => {
    return productOrder
      .map((handle) => productEditorial[handle])
      .filter(Boolean)
      .map((editorial) => mergeOne(editorial, getByHandle));
    // products is the reactive dependency that actually changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return { products: merged, isLoading, error };
}

export function useMergedProductByHandle(handle: string | undefined) {
  const { products, isLoading, error } = useMergedProducts();
  const product = useMemo(
    () => products.find((p) => p.handle === handle),
    [products, handle],
  );
  return { product, isLoading, error };
}
