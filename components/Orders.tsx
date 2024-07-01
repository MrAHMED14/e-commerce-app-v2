import { getAllOrders } from "@/lib/action"

const Orders = async () => {
  const orders = await getAllOrders()
  //console.log(orders)
  return (
    <div className="mt-10">
      <h1 className="text-xl font-bold text-rose-500">Orders</h1>
      {orders?.map((order) => (
        <div className="" key={order.id}>
          <div className="flex gap-4">
            <h3>{order.id}</h3>
            <h3>
              {order.user.firstName} {order.user.lastName}
            </h3>
            <div className="">
              {order.items.map((item) => (
                <p key={item.id}>
                  {item.product.title}{" "}
                  <span className="text-rose-400">x{item.quantity}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="h-px w-1/3 my-4 bg-slate-50" />
        </div>
      ))}
    </div>
  )
}

export default Orders
