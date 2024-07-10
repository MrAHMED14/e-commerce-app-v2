"use client"
import { Product } from "@prisma/client"
import Link from "next/link"

export default function ProInfo({
  product,
  proCat,
  proSubCat,
}: {
  product: Product | null | undefined
  proCat: string | undefined
  proSubCat: string | undefined
}) {
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
        onClick={() => {}}
        className="dark:bg-gray-100 dark:text-stone-950 bg-stone-950 text-gray-100 p-2 rounded mt-1 font-semibold"
      >
        Add to cart
      </button>
    </>
  )
}
