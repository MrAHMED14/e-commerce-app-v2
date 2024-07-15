import Link from "next/link"

export default function Loading() {
  return (
    <div className="container mt-10">
      <Link href={"/"} className="hover:underline dark:text-rose-200">
        {"< Home"}
      </Link>
      <h1 className="text-2xl font-bold dark:text-rose-500 mb-2">Orders</h1>
      <p className="container mt-10">Loading...</p>
    </div>
  )
}
