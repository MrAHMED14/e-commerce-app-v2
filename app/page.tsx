import Orders from "@/components/Orders"
import Products from "@/components/Products"
import User from "@/components/User"

export default async function Home() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <User />
      <Products />
    </div>
  )
}
