import ProCard from "@/components/ProCard"
import Progress from "@/components/ProgressList"
import ProList2 from "@/components/ProList2"
import Link from "next/link"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

const TEST_PRODUCT = {
  id: "",
  title: "Huawei P40 Pro",
  price: 520,
  img: [""],
  createdAt: new Date(),
  description: "1",
  subcategoryId: "1",
}

export default async function Home() {
  return (
    <div className="sm:container">
      <h1 className="mt-10 text-3xl font-bold">Welcome</h1>
      <div className="space-x-2">
        <Link
          href={"/shop"}
          className="hover:underline dark:text-rose-200 mt-2"
        >
          Shop
        </Link>
        <Link href={"/ordres"} className="hover:underline dark:text-rose-200">
          Ordres (Protected)
        </Link>

        <Link
          href={"/add-product"}
          className="hover:underline dark:text-rose-200"
        >
          Add product
        </Link>
      </div>
      <h1 className="mt-10 text-2xl font-bold dark:text-rose-500">
        Products Log
      </h1>
      <Suspense fallback={<>Loading...</>}>
        <ProList2 />
      </Suspense>

      <div className="my-10">
        <h1 className="mt-10 text-2xl font-bold dark:text-rose-500">
          Card design
        </h1>
        <div className="w-full flex items-center gap-20 my-6">
          <ProCard
            className="scale-110 sm:hover:scale-[1.15]"
            product={TEST_PRODUCT}
          />
          <ProCard product={TEST_PRODUCT} />
        </div>
      </div>

      <div className="my-10">
        <h1 className="mt-10 text-2xl font-bold dark:text-rose-500">
          Progress
        </h1>
        <Progress />
      </div>
    </div>
  )
}
