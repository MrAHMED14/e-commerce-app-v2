import { countProducts, ProductFilterValues } from "@/lib/action"
import { Suspense } from "react"
import { Prisma } from "@prisma/client"
import SortOptions from "@/components/SortOptions"
import Products from "@/components/ProductsList"
import Loading from "../../../components/LoadingPro"
import Filter from "@/components/Filter"
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

  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : undefined

  const price = {
    gte: min ? parseInt(min) : undefined,
    lte: max ? parseInt(max) : undefined,
  }

  const selectedOrder = {
    name: typeof sort === "string" ? sort.split("-")[0] : undefined,
    value:
      typeof sort === "string"
        ? (sort.split("-")[1] as Prisma.SortOrder)
        : undefined,
  }

  let filter: ProductFilterValues = {
    query: search,
    category,
    subCategory,
    selectedOrder,
    price,
  }
  const totalItemCount = await countProducts(filter)

  const page = typeof searchParams.page === "string" ? searchParams.page : "1"
  const currentPage = parseInt(page)

  const pageSize = 20 as const

  const totalPages = Math.ceil(totalItemCount / pageSize)

  const pagination = {
    currentPage,
    totalPages,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  }

  filter = {
    ...filter,
    pagination,
  }
  return (
    <>
      <div className="sm:container sm:mx-auto mt-10">
        <Link href={"/"} className="hover:underline dark:text-rose-200">
          {"< Home"}
        </Link>
        <div className="w-full flex items-center">
          <h1 className="text-2xl font-bold dark:text-rose-500 mb-2">
            Products
          </h1>
          <div className="sm:container flex items-center justify-end">
            <Suspense>
              <SortOptions />
            </Suspense>
          </div>
        </div>
        <div className="mx-4 flex gap-x-2 justify-center">
          <Filter />
          <Suspense
            key={
              subCategory || category || search || sort || min || max || page
            }
            fallback={<Loading />}
          >
            <Products filter={filter} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
