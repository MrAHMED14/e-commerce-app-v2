import { MainCategory, Subcategory } from "@prisma/client"
import { Suspense } from "react"
import FiltreOptions from "./FilterOptions"

export default async function Filter({
  categories,
  subCategories,
}: {
  categories?: MainCategory[]
  subCategories?: Subcategory[]
}) {
  return (
    <div className="w-[240px] hidden lg:block">
      <div className="border sticky top-1 w-full flex-col p-4 rounded-md">
        <h1 className="font-bold text-lg">Filters</h1>
        <Suspense>
          <FiltreOptions
            categories={categories}
            subCategories={subCategories}
          />
        </Suspense>
      </div>
    </div>
  )
}
