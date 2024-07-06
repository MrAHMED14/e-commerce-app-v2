import { Product } from "@prisma/client"

const ProCard = ({ product }: { product: Product }) => {
  return (
    <div className="cursor-pointer sm:hover:scale-90 sm:duration-500 scale-[.85] m-2 relative bg-slate-50 rounded-lg w-72 shadow-lg border">
      <div className="relative pt-5 px-3 flex items-center justify-center">
        <div className="w-52 h-48 bg-gray-300/80 rounded-lg animate-pulse" />
      </div>
      <div className="relative text-slate-800 px-6 pb-3 mt-6">
        <div className="flex flex-col justify-between">
          <p className="font-medium text-xl line-clamp-2 h-14">
            {product.title}
          </p>

          <div className="flex flex-col justify-end h-16">
            <span className="flex text-slate-400 text-sm font-bold line-through leading-none items-center">
              {product.price + 26} $
            </span>
            <span className="block text-slate-950 text-xl font-bold pb-2 leading-none items-center mb-1">
              {product.price} $
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProCard
