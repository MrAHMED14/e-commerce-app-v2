import { getAllProducts2, ProductFilterValues } from "@/lib/action"
import ProCard from "./ProCard"
import Filtre from "./filter"

const Products = async ({
  filter,
}: {
  filter?: ProductFilterValues | undefined
}) => {
  const products = await getAllProducts2(filter ? filter : {})

  return (
    <div className="w-full flex flex-col">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 min-[960px]:grid-cols-3 min-[1250px]:grid-cols-4 place-items-center">
        {products && (
          <>
            {products.map((product) => (
              <ProCard key={product.id} product={product} />
            ))}
          </>
        )}
        {!products.length && (
          <>
            <h1>Nothing to show</h1>
          </>
        )}
      </div>
    </div>
  )
}

export default Products
