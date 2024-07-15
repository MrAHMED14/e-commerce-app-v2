import { Prisma } from "@prisma/client"
import { Trash2 } from "lucide-react"
import DeleteCartItem from "./DeleteCartItem"

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true }
}>

interface CartEntryProps {
  cartItem: CartItemWithProduct
}
export default function CartItem({
  cartItem: { product, quantity, productId },
}: CartEntryProps) {
  return (
    <li className="flex gap-2 items-center">
      <span>{product.title}</span>
      <span className="text-sm font-semibold">x{quantity}</span>
      <DeleteCartItem productId={productId} />
    </li>
  )
}
