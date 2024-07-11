import CartItem from "@/components/CartItem"
import ResetCart from "@/components/ResetCart"
import { getCart } from "@/lib/cart"
import Link from "next/link"

export default async function page() {
  const cart = await getCart()
  return (
    <div className="container mt-10">
      <h1 className="text-2xl">Cart</h1>
      <ul className="container">
        {cart?.items.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </ul>
      {cart && (
        <>
          <div className="">
            <p>subtotal: {cart.subtotal} $</p>
          </div>
          <ResetCart cartId={cart.id} />
          <div className="">
            <Link className="hover:underline" href={"/checkout"}>
              Checkout
            </Link>
          </div>
        </>
      )}
      {!cart?.items.length && <p>Your cart is empty.</p>}
    </div>
  )
}
