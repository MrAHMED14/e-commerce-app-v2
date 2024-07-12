import { getCart } from "@/lib/cart"

export default async function page() {
  const cart = await getCart()
  return <div>checkout</div>
}
