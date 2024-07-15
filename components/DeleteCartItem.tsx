"use client"
import { deleteCartItem } from "@/app/(pages)/shop/cart/actions"
import { Loader2, Trash2 } from "lucide-react"
import { useTransition } from "react"

export default function DeleteCartItem({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDeleteCartItem = () => {
    startTransition(async () => {
      await deleteCartItem(productId)
    })
  }

  return (
    <button disabled={isPending} onClick={handleDeleteCartItem}>
      {isPending ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <Trash2 size={20} className="cursor-pointer hover:text-red-500" />
      )}
    </button>
  )
}
