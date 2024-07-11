import { getProCatAndSubCatById, getProductById } from "@/lib/action"
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

  const proCatAndSubCat = await getProCatAndSubCatById(
    product.subcategoryId as string
  )

  return (
    <div className="container mt-10">
      <div className="">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        / {proCatAndSubCat?.mainCategory.name} / {proCatAndSubCat?.name}
      </div>
      <div className="mt-14">
        <h1 className="text-4xl font-bold">{product?.title}</h1>
        <p className="">{product?.description}</p>
        <p className="">{JSON.stringify(product?.img, null, 2)}</p>
        <h4 className="text-xl mt-2">{product?.price} $</h4>
      </div>
      <AddToCart productId={product.id} />
    </div>
  )
}
