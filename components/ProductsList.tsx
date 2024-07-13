import { getAllProducts2, ProductFilterValues } from "@/lib/action"
import ProCard from "./ProCard"
import ProPagination from "./ProPagination"

const Products = async ({
  filter,
}: {
  filter?: ProductFilterValues | undefined
}) => {
  const products = await getAllProducts2(filter ? filter : {})

  return (
    <div className="w-full flex flex-col mb-20">
      {products && (
        <>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 min-[960px]:grid-cols-3 min-[1250px]:grid-cols-4 place-items-center">
            {products.map((product) => (
              <ProCard key={product.id} product={product} />
            ))}
          </div>
          {products.length >= 1 &&
            filter &&
            filter.pagination &&
            filter.pagination.totalPages > 1 && (
              <ProPagination
                currentPage={filter.pagination.currentPage}
                totalPages={filter.pagination.totalPages}
              />
            )}
        </>
      )}

      {!products.length && (
        <div className="w-full h-[calc(100vh-150px)] flex items-center justify-center">
          <h1 className="text-4xl font-bold text-center mb-14 dark:text-muted text-stone-950/50">
            Nothing to show
          </h1>
        </div>
      )}
    </div>
  )
}

export default Products
