import Progress from "@/components/ProgressList"
import ProList2 from "@/components/ProList2"
import Link from "next/link"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

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
          Ordres
        </Link>
      </div>
      <h1 className="mt-10 text-2xl font-bold dark:text-rose-500">Products</h1>
      <Suspense fallback={<>Loading...</>}>
        <ProList2 />
      </Suspense>

      <div className="my-10">
        <h1 className="mt-10 text-2xl font-bold dark:text-rose-500">
          Progress
        </h1>
        <Progress />
      </div>
    </div>
  )
}
