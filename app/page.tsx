import Progress from "@/components/ProgressList"
import User from "@/components/User"
import { getAllProducts2 } from "@/lib/action"
import Link from "next/link"

export default async function Home() {
  const products = await getAllProducts2({})
  //console.log(products.length)
  return (
    <div className="sm:container">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <User />
      <Link href={"/shop"} className="hover:underline dark:text-rose-200 mt-2">
        Shop
      </Link>
      <br />
      <Link href={"/ordres"} className="hover:underline dark:text-rose-200">
        Ordres
      </Link>
      <h1 className="mt-10 text-2xl font-bold dark:text-rose-500">Products</h1>
      <ul className="h-96 overflow-x-hidden overflow-y-scroll border-2 border-muted-foreground px-4 py-2">
        {products?.map((p) => (
          <li key={p.id}>
            {p.title} - ${p.price}
          </li>
        ))}
      </ul>
      <div className="my-10">
        <h1 className="mt-10 text-2xl font-bold dark:text-rose-500">
          Progress
        </h1>
        <Progress />
      </div>
    </div>
  )
}
