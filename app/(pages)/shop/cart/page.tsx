import CartItem from "@/components/CartItem"

export default async function page() {
  //const cart = await getCart()
  return (
    <div className="container mt-10">
      <h1 className="text-2xl">Cart</h1>
      {/* <ul className="container">
        {cart?.items.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </ul>
      {!cart?.items.length && <p>Your cart is empty.</p>} */}
    </div>
  )
}
