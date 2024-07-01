import { getAllProducts } from "@/lib/action"
import { Span } from "next/dist/trace"

const Products = async () => {
  const products = await getAllProducts()
  //console.log(products)
  return (
    <div className="mt-10">
      <h1 className="text-xl font-bold text-rose-500">Products</h1>
      <ul className="pl-5">
        {products?.map((product) => (
          <li key={product.id}>
            {product.title}{" "}
            <span className="text-xs text-rose-300">{product.price} $</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Products
