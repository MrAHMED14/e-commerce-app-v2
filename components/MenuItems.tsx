import { Box, Home, ShoppingBag, ShoppingBasket } from "lucide-react"
import Link from "next/link"

export default function MenuItems() {
  return (
    <>
      <ul className="flex items-center gap-10">
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
            Cart
          </Link>
        </li>
        <li className="flex items-center gap-1">
          <Box size={18} />
          <Link href={"/ordres"} className="hover:underline">
            Orders
          </Link>
        </li>
      </ul>
    </>
  )
}
