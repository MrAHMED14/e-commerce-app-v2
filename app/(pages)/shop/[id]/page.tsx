import ProInfo from "@/components/ProInfo"
import { getProCatAndSubCatById, getProductById } from "@/lib/action"
import { notFound } from "next/navigation"

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
      <ProInfo
        product={product}
        proCat={proCatAndSubCat?.mainCategory.name}
        proSubCat={proCatAndSubCat?.name}
      />
    </div>
  )
}
