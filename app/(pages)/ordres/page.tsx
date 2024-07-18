import Orders from "@/components/OrdersList"

export const dynamic = "force-dynamic"

export default function OrdersPage() {
  return (
    <div className="container">
      <section className="sm:container py-24">
        <h1 className="pb-3 text-3xl font-bold">Orders</h1>
        <Orders />
      </section>
    </div>
  )
}
