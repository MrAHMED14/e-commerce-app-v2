"use client"
import { Product } from "@prisma/client"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useTransition } from "react"

interface ProInfoProps {
  product: Product
  proCat: string | undefined
  proSubCat: string | undefined
}

export default function ProInfo({ product, proCat, proSubCat }: ProInfoProps) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)

  return (
    <>
      <Link href="/" className="hover:underline">
        Home
      </Link>{" "}
      / {proCat} / {proSubCat}
      <h1 className="text-4xl font-bold mt-14">{product?.title}</h1>
      <p className="">{product?.description}</p>
      <p className="">{JSON.stringify(product?.img, null, 2)}</p>
      <h4 className="text-xl mt-3">{product?.price} $</h4>
      <button
        disabled={isPending}
        onClick={() => {
          setSuccess(false)
          startTransition(async () => {
            //await incrementProductQuantity(product.id)
            setSuccess(true)
          })
        }}
        className="dark:bg-gray-100 dark:text-stone-950 bg-stone-950 text-gray-100 p-2 rounded mt-1 font-semibold"
      >
        Add to cart {isPending && <Loader2 className="animate-spin" />}
      </button>
      {!isPending && success && (
        <span className="text-success">Added to Cart.</span>
      )}
    </>
  )
}
