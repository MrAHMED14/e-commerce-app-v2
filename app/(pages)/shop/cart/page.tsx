import { buttonVariants } from "@/components/ui/button"
import { getCart } from "@/lib/cart"
import ResetCart from "@/components/ResetCart"
import CartItem from "@/components/CartItem"
import Link from "next/link"

export default async function page() {
  const cart = await getCart()

  return (
    <div className="container">
      <div className="sm:container py-24">
        <div className="">
          <h1 className="pb-3 text-3xl font-bold">Cart</h1>
          <ul className="container">
            {cart?.items.map((cartItem) => (
              <div className="" key={cartItem.id}>
                <CartItem cartItem={cartItem} />
                <div className="h-px w-1/3 bg-black dark:bg-white my-2" />
              </div>
            ))}
          </ul>
          {cart && cart.items.length > 0 && (
            <>
              <div className="container">
                <p className="text-lg font-semibold">
                  subtotal: {Math.round(cart.subtotal)} $
                </p>
              </div>
              <div className="mb-2">
                <ResetCart cartId={cart.id} />
              </div>
              <Link className={buttonVariants({})} href={"/checkout"}>
                Checkout
              </Link>
            </>
          )}
          {(cart?.items.length === 0 || !cart) && <p>Your cart is empty.</p>}
        </div>
      </div>
    </div>
  )
}
