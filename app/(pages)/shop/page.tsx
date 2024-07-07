import Products from "@/components/ProductsList"
import Filtre from "@/components/FilterOptions"
import { ProductFilterValues } from "@/lib/action"
import { Prisma } from "@prisma/client"
import { Suspense } from "react"
import Loading from "../../../components/LoadingPro"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined

  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined

  const subCategory =
    typeof searchParams.subCategory === "string"
      ? searchParams.subCategory
      : undefined

  const min =
    typeof searchParams.min === "string" ? searchParams.min : undefined

  const max =
    typeof searchParams.max === "string" ? searchParams.max : undefined

  const price = {
    gte: min ? parseInt(min) : undefined,
    lte: max ? parseInt(max) : undefined,
  }

  const selectedOrder = {
    name: "",
    value: "desc" as Prisma.SortOrder,
  }

  const filter: ProductFilterValues = {
    query: search,
    category,
    subCategory,
    selectedOrder,
    price,
  }
  return (
    <>
      <div className="sm:container sm:mx-auto mt-10">
        <Link href={"/"} className="hover:underline dark:text-rose-200">
          {"< Home"}
        </Link>
        <h1 className="text-2xl font-bold dark:text-rose-500 mb-2">Products</h1>
        <div className="mx-4 flex gap-x-2 justify-center">
          <div className="w-[240px] hidden lg:block">
            <div className="border sticky top-1 w-full flex-col p-4 rounded-md">
              <h1 className="font-bold text-lg">Filters</h1>
              <Suspense>
                <Filtre />
              </Suspense>
            </div>
          </div>
          <Suspense
            key={subCategory || category || search}
            fallback={<Loading />}
          >
            <Products filter={filter} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
