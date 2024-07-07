import Orders from "@/components/Orders"
import Link from "next/link"
export const dynamic = "force-dynamic"
export default function OrdersPage() {
  return (
    <div className="sm:container mt-10">
      <Link href={"/"} className="hover:underline dark:text-rose-200">
        {"< Home"}
      </Link>
      <h1 className="text-2xl font-bold dark:text-rose-500 mb-2">Orders</h1>

      <Orders />
    </div>
  )
}
