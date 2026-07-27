import { storefrontApiRequest } from "./shopify";

/**
 * Cart mutations for Shopify Storefront API 2025-07.
 * Checkout is hosted by Shopify; we only manage the cart here.
 */

interface CartUserError {
  field: string[] | null;
  message: string;
}

interface CartLineNode {
  id: string;
  quantity: number;
  merchandise: { id: string };
}

interface CartPayload {
  id: string;
  checkoutUrl: string;
  lines: { edges: { node: CartLineNode }[] };
}

interface CartMutationResult {
  cart: CartPayload | null;
  userErrors: CartUserError[];
}

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
            }
          }
        }
      }
    }
  }
`;

/**
 * Append ?channel=online_store so the hosted checkout uses the correct channel.
 */
export function formatCheckoutUrl(url: string): string {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("channel", "online_store");
    return parsed.toString();
  } catch {
    return url.includes("?")
      ? `${url}&channel=online_store`
      : `${url}?channel=online_store`;
  }
}

function isCartNotFound(errors: CartUserError[]): boolean {
  return errors.some(
    (e) =>
      /cart/i.test(e.message) &&
      /(not found|does not exist|invalid)/i.test(e.message),
  );
}

export interface CartLineInput {
  variantId: string;
  quantity: number;
}

export interface CreateCartResult {
  cartId: string;
  checkoutUrl: string;
  lineId: string | null;
}

export async function createShopifyCart(
  item: CartLineInput,
): Promise<CreateCartResult> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await storefrontApiRequest<{ cartCreate: CartMutationResult }>(
    query,
    { lines: [{ merchandiseId: item.variantId, quantity: item.quantity }] },
  );

  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length > 0 || !cart) {
    throw new Error(
      userErrors.map((e) => e.message).join("; ") || "Failed to create cart.",
    );
  }

  const lineNode = cart.lines.edges.find(
    (e) => e.node.merchandise.id === item.variantId,
  );

  return {
    cartId: cart.id,
    checkoutUrl: formatCheckoutUrl(cart.checkoutUrl),
    lineId: lineNode ? lineNode.node.id : null,
  };
}

export interface CartLineOpResult {
  success: boolean;
  cartNotFound?: boolean;
  lineId?: string | null;
  checkoutUrl?: string;
}

export async function addLineToShopifyCart(
  cartId: string,
  item: CartLineInput,
): Promise<CartLineOpResult> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await storefrontApiRequest<{ cartLinesAdd: CartMutationResult }>(
    query,
    {
      cartId,
      lines: [{ merchandiseId: item.variantId, quantity: item.quantity }],
    },
  );

  const { cart, userErrors } = data.cartLinesAdd;
  if (isCartNotFound(userErrors) || (!cart && userErrors.length > 0)) {
    return { success: false, cartNotFound: isCartNotFound(userErrors) };
  }
  if (!cart) return { success: false };

  const lineNode = cart.lines.edges.find(
    (e) => e.node.merchandise.id === item.variantId,
  );

  return {
    success: true,
    lineId: lineNode ? lineNode.node.id : null,
    checkoutUrl: formatCheckoutUrl(cart.checkoutUrl),
  };
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<CartLineOpResult> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await storefrontApiRequest<{
    cartLinesUpdate: CartMutationResult;
  }>(query, { cartId, lines: [{ id: lineId, quantity }] });

  const { cart, userErrors } = data.cartLinesUpdate;
  if (isCartNotFound(userErrors)) {
    return { success: false, cartNotFound: true };
  }
  if (!cart) return { success: false };

  return { success: true, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl) };
}

export async function removeLineFromShopifyCart(
  cartId: string,
  lineId: string,
): Promise<CartLineOpResult> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await storefrontApiRequest<{
    cartLinesRemove: CartMutationResult;
  }>(query, { cartId, lineIds: [lineId] });

  const { cart, userErrors } = data.cartLinesRemove;
  if (isCartNotFound(userErrors)) {
    return { success: false, cartNotFound: true };
  }
  if (!cart) return { success: false };

  return { success: true, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl) };
}
