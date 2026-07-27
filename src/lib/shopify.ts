import { toast } from "sonner";

/**
 * Shopify Storefront API client.
 * The Storefront access token is a public, client-side token by design.
 * Values can be overridden via Vite env vars (VITE_SHOPIFY_*).
 */
export const SHOPIFY_API_VERSION = "2025-07";

export const SHOPIFY_STORE_PERMANENT_DOMAIN =
  import.meta.env.VITE_SHOPIFY_DOMAIN || "nora-1312224.myshopify.com";

export const SHOPIFY_STOREFRONT_TOKEN =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN ||
  "e7017707a2f6b51d81c9308c7d212b7d";

export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImageNode {
  url: string;
  altText: string | null;
}

export interface ShopifyVariantNode {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  selectedOptions: { name: string; value: string }[];
}

export interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  images: { edges: { node: ShopifyImageNode }[] };
  variants: { edges: { node: ShopifyVariantNode }[] };
  options: { name: string; values: string[] }[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  minPrice: ShopifyMoney;
  images: ShopifyImageNode[];
  variants: ShopifyVariantNode[];
  options: { name: string; values: string[] }[];
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

/**
 * Low-level Storefront API request. Throws on network / GraphQL errors.
 */
export async function storefrontApiRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (err) {
    throw new Error(
      `Network error contacting Shopify: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }

  if (response.status === 402) {
    toast.error("This store is not currently accepting orders.", {
      description: "The shop may be paused for billing. Please try again later.",
    });
    throw new Error("Shopify returned 402 (payment required / billing).");
  }

  if (!response.ok) {
    throw new Error(`Shopify request failed with status ${response.status}.`);
  }

  const json = (await response.json()) as GraphQLResponse<T>;

  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  if (!json.data) {
    throw new Error("Shopify returned an empty response.");
  }

  return json.data;
}

export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

/**
 * Flatten a raw Shopify product node into a friendlier shape.
 */
export function normalizeProduct(node: ShopifyProductNode): ShopifyProduct {
  return {
    id: node.id,
    title: node.title,
    description: node.description,
    handle: node.handle,
    minPrice: node.priceRange.minVariantPrice,
    images: node.images.edges.map((e) => e.node),
    variants: node.variants.edges.map((e) => e.node),
    options: node.options,
  };
}

/**
 * Format a Shopify money object as $XX or $XX.YY (whole dollars drop cents).
 */
export function formatMoney(money: ShopifyMoney | undefined | null): string {
  if (!money) return "";
  const value = parseFloat(money.amount);
  if (Number.isNaN(value)) return "";
  const symbol = money.currencyCode === "USD" ? "$" : `${money.currencyCode} `;
  const isWhole = value % 1 === 0;
  return `${symbol}${isWhole ? value.toFixed(0) : value.toFixed(2)}`;
}
