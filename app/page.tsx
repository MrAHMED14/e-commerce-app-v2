import User from "@/components/User"
import { getAllProducts2 } from "@/lib/action"
import { Prisma } from "@prisma/client"
import Link from "next/link"

export default async function Home() {
  const products = await getAllProducts2({})
  //console.log(products.length)
  return (
    <div className="">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <User />
      <Link href={"/shop"} className="hover:underline text-rose-200">
        Shop
      </Link>
      <h1 className="mt-10 text-xl font-bold text-rose-500">Products</h1>
      <ul>
        {products?.map((p) => (
          <li key={p.id}>
            {p.title} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  )
}
