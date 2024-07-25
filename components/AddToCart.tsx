"use client"

import { incrementProductQuantity } from "@/lib/action"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface AddToCartProps {
  productId: string
}

export default function AddToCart({ productId }: AddToCartProps) {
  const [isPending, startTransition] = useTransition()

  const handleAddToCart = () => {
    startTransition(async () => {
      await incrementProductQuantity(productId)
      toast.success("Added to Cart.")
    })
  }

  return (
    <div className="flex flex-col w-fit">
      <button
        disabled={isPending}
        onClick={handleAddToCart}
        className="dark:bg-gray-100 dark:text-stone-950 bg-stone-950 text-gray-100 py-2 px-5 rounded mt-1 font-semibold"
      >
        <span className="flex gap-2 items-center">
          Add to cart
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        </span>
      </button>
    </div>
  )
}
