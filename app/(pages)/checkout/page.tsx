import CartItem from "@/components/CartItem"
import MakeOrder from "@/components/MakeOrder"
import { getCart } from "@/lib/cart"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function CheckoutPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const cart = await getCart()
  if (!user) {
    return
  }

  return (
    <div className="container">
      <section className="sm:container py-24">
        <h1 className="pb-3 text-3xl font-bold">Checkout</h1>
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
            <MakeOrder cartItems={cart} userId={user.id} />
          </>
        )}
        {(cart?.items.length === 0 || !cart) && <p>Your cart is empty.</p>}
      </section>
    </div>
  )
}
