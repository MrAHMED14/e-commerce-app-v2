import { cn } from "@/lib/utils"
import {
  Box,
  Home,
  PlusCircle,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react"
import Link from "next/link"

export default function MenuItems({
  cartSize,
  className,
}: {
  cartSize?: number
  className?: string
}) {
  return (
    <ul className={cn("flex items-center gap-8", className)}>
      <li className="flex items-center gap-1">
        <Home size={18} />
        <Link href={"/"} className="hover:underline">
          Home
        </Link>
      </li>
      <li className="flex items-center gap-1">
        <ShoppingBag size={18} />
        <Link href={"/shop"} className="hover:underline">
          Shop
        </Link>
      </li>
      <li className="flex items-center gap-1">
        <ShoppingBasket size={18} />
        <Link href={"/shop/cart"} className="hover:underline">
          Cart ({cartSize ? cartSize : 0})
        </Link>
      </li>
      <li className="flex items-center gap-1">
        <Box size={18} />
        <Link href={"/ordres"} className="hover:underline">
          Orders
        </Link>
      </li>
      <li className="flex items-center gap-1">
        <PlusCircle size={18} />
        <Link href={"/add-product"} className="hover:underline">
          Add Product
        </Link>
      </li>
    </ul>
  )
}
