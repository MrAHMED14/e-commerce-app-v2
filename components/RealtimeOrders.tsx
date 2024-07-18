"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RealtimeOrders({ orders }: { orders?: any[] }) {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel("realtime orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Order" },
        () => {
          router.refresh()
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [router, supabase])

  return (
    <div className="">
      {orders &&
        orders.map((order) => (
          <div className="" key={order.id}>
            <div className="flex gap-4">
              <h3>
                <span>
                  {order.user.firstName} {order.user.lastName}
                </span>
                <br />
                <span>{order.address.street}</span>
              </h3>
              <div className="">
                {order.items.map((item: any) => (
                  <p key={item.id}>
                    {item.product.title}{" "}
                    <span className="dark:text-rose-400">x{item.quantity}</span>
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
  )
}
