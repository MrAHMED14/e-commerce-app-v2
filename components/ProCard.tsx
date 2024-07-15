import { Product } from "@prisma/client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const ProCard = ({
  product: { id, price, title, img },
  className,
}: {
  product: Product
  className?: string
}) => {
  return (
    <Link
      href={`/shop/${id}`}
      className={cn(
        "flex flex-col items-center justify-center relative bg-gray-50 rounded-lg w-60 h-[300px] shadow-lg border sm:hover:scale-105 sm:duration-500",
        className
      )}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center pt-3">
          {/* Image */}
          <Image
            src={"/001.webp"}
            width={150}
            height={150}
            alt={`img`}
            className="w-[160px] h-[160px] object-cover object-center rounded scale-[.97]"
          />
          {/* <div className="w-[160px] h-[160px] {w-[180px]} {h-40} bg-gray-300/80 rounded-lg animate-pulse" /> */}
        </div>
      </div>
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-full h-full px-4 mt-3">
            {/* Title */}
            <h3 className="text-stone-950 font-medium text-lg line-clamp-2 h-fit">
              {title}
            </h3>
          </div>

          <div className="w-full h-full flex flex-col justify-end px-4 pb-3 mt-2">
            {/* Orginal price */}
            <h3 className="text-slate-400 text-sm font-semibold line-through leading-none">
              {Math.ceil(price + 260)} Da
            </h3>
            {/* Price after discount */}
            <h3 className="text-slate-950 font-bold">{Math.ceil(price)} Da</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProCard
