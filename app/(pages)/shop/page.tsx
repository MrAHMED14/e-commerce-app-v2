import Filtre from "@/components/FilterOptions"
import Products from "@/components/ProductsList"
import SortOptions from "@/components/SortOptions"
import { countProducts, ProductFilterValues } from "@/lib/action"
import { Prisma } from "@prisma/client"
import Link from "next/link"
import { Suspense } from "react"
import Loading from "../../../components/LoadingPro"

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
  const page = typeof searchParams.page === "string" ? searchParams.page : "1"

  const currentPage = parseInt(page)

  const pageSize = 20 as const
  const totalItemCount = await countProducts(filter)

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
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-rose-500 mb-2">
            Products
          </h1>
          <Suspense>
            <SortOptions />
          </Suspense>
        </div>
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
            key={subCategory || category || search || sort || min || max}
            fallback={<Loading />}
          >
            <Products filter={filter} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
