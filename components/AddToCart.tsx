"use client"
import { incrementProductQuantity } from "@/lib/action"
import { Loader2 } from "lucide-react"
import { useState, useTransition } from "react"

interface ProInfoProps {
  productId: string
}

export default function AddToCart({ productId }: ProInfoProps) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)

  return (
    <div className="flex flex-col w-fit">
      {!isPending && success && (
        <span className="text-green-500 font-semibold mt-2">
          Added to Cart.
        </span>
      )}
      <button
        disabled={isPending}
        onClick={() => {
          setSuccess(false)
          startTransition(async () => {
            await incrementProductQuantity(productId)
            setSuccess(true)
          })
        }}
        className="dark:bg-gray-100 dark:text-stone-950 bg-stone-950 text-gray-100 py-2 px-5 rounded mt-1 font-semibold"
      >
        <span className="flex gap-2 items-center">
          Add to cart{" "}
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        </span>
      </button>
    </div>
  )
}
