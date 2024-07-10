import { Prisma } from "@prisma/client"

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true }
}>

interface CartEntryProps {
  cartItem: CartItemWithProduct
}
export default function CartItem({ cartItem }: CartEntryProps) {
  return (
    <li>
      {cartItem.product.title}{" "}
      <span className="text-sm font-semibold">x{cartItem.quantity}</span>
    </li>
  )
}
