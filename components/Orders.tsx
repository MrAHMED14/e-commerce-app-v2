import { getAllOrders } from "@/lib/action"

const Orders = async () => {
  const orders = await getAllOrders()
  //console.log(orders)
  return (
    <>
      <div className="">
        {orders &&
          orders.map((order) => (
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
                      <span className="dark:text-rose-400">
                        x{item.quantity}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="h-px w-1/3 my-4 dark:bg-slate-50 bg-stone-950" />
            </div>
          ))}
        {orders && !orders.length && (
          <div className="w-full h-[calc(100vh-150px)] flex items-center justify-center">
            <h1 className="text-4xl font-bold text-center mb-14 dark:text-muted text-stone-950/50">
              Nothing to show
            </h1>
          </div>
        )}
      </div>
    </>
  )
}

export default Orders
