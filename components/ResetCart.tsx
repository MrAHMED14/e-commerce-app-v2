"use client"

import { resetCart } from "@/app/(pages)/shop/cart/actions"
import { Loader2 } from "lucide-react"
import { useTransition } from "react"

export default function ResetCart({ cartId }: { cartId: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          resetCart(cartId)
        })
      }}
      className="hover:underline mt-5"
    >
      <span className="flex gap-2 items-center">
        Reset Cart {isPending && <Loader2 className="animate-spin w-4 h-4" />}
      </span>
    </button>
  )
}
