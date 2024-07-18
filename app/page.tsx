import ProCard from "@/components/ProCard"
import Progress from "@/components/ProgressList"
import ProList2 from "@/components/ProList2"
import { buttonVariants } from "@/components/ui/button"
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
    <>
      <div className="container">
        <div className="sm:container py-24">
          <section className="">
            <h1 className="pb-3 text-3xl font-bold">Welcome</h1>
            <div className="space-x-2">
              <Link href={"/shop"} className={buttonVariants({})}>
                Shop
              </Link>
              <Link href={"/ordres"} className={buttonVariants({})}>
                Ordres (Protected)
              </Link>

              <Link href={"/add-product"} className={buttonVariants({})}>
                Add product
              </Link>
            </div>
          </section>

          <section className="mt-20">
            <h1 className="pb-3 text-3xl font-bold">Products LOG</h1>
            <Suspense fallback={<>Loading...</>}>
              <ProList2 />
            </Suspense>
          </section>
          <section className="mt-20">
            <h1 className="pb-3 text-3xl font-bold">Card design</h1>
            <div className="w-full flex items-center gap-20 my-6">
              <ProCard
                className="scale-110 sm:hover:scale-[1.15]"
                product={TEST_PRODUCT}
              />
              <ProCard product={TEST_PRODUCT} />
            </div>
          </section>

          <section className="mt-20">
            <h1 className="pb-3 text-3xl font-bold">Progress</h1>
            <Progress />
          </section>
        </div>
      </div>
    </>
  )
}
