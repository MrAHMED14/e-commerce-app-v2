import RealtimeOrders from "./RealtimeOrders"
import { getAllOrders } from "@/lib/action"

const Orders = async () => {
  const orders = await getAllOrders()
  //console.log(orders)
  return (
    <>
      <RealtimeOrders orders={orders} />
    </>
  )
}

export default Orders
