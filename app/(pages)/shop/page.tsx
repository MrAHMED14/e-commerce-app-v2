import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  countProducts,
  getCategories,
  getsubCategories,
  ProductFilterValues,
} from "@/lib/action"

import Filter from "@/components/Filter"
import FiltreOptions from "@/components/FilterOptions"
import Products from "@/components/ProductsList"
import SortOptions from "@/components/SortOptions"
import { buttonVariants } from "@/components/ui/button"
import { Prisma } from "@prisma/client"
import { Loader2 } from "lucide-react"
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

  const categories = await getCategories()
  const subCategories = await getsubCategories(category)

  return (
    <div className="container">
      <div className="py-24">
        <section>
          <div className="w-full block min-[410px]:flex min-[410px]:flex-row justify-between items-center pb-3 mb-3">
            <h1 className="text-3xl font-bold">Our Products</h1>

            <div className="flex items-center justify-center max-[408px]:mt-8 gap-4">
              <Suspense fallback={<Loader2 className="w-4 h-4 animate-spin" />}>
                <SortOptions />
              </Suspense>
              <div className="flex lg:hidden">
                <Sheet>
                  <SheetTrigger>
                    <span className={buttonVariants({})}>Filter</span>
                  </SheetTrigger>
                  <SheetContent side="bottom">
                    <SheetHeader>
                      <SheetTitle className="text-left">Filter</SheetTitle>
                      <Suspense>
                        <FiltreOptions
                          categories={categories}
                          subCategories={subCategories}
                        />
                      </Suspense>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
          <div className="flex gap-x-2 justify-center">
            <Filter categories={categories} subCategories={subCategories} />
            <Suspense
              key={
                subCategory || category || search || sort || min || max || page
              }
              fallback={<Loading />}
            >
              <Products filter={filter} />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  )
}
