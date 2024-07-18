import { getCategoryAndSubcategoryById, getProductById } from "@/lib/action"
import { notFound } from "next/navigation"
import Link from "next/link"
import AddToCart from "@/components/AddToCart"

export default async function page({
  params: { id },
}: {
  params: { id: string }
}) {
  const product = await getProductById(id)

  if (!product) {
    return notFound()
  }

  const path = await getCategoryAndSubcategoryById(
    product.subcategoryId as string
  )

  return (
    <div className="container">
      <section className="sm:container py-24">
        <div className="">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / {path?.category} / {path?.subCategory}
        </div>
        <div className="mt-14">
          <h1 className="text-4xl font-bold">{product?.title}</h1>
          <p className="">{product?.description}</p>
          <p className="">{JSON.stringify(product?.img, null, 2)}</p>
          <h4 className="text-xl mt-2">{product?.price} $</h4>
        </div>
        <AddToCart productId={product.id} />
      </section>
    </div>
  )
}
