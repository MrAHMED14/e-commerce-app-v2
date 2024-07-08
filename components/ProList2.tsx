import { getAllProducts2 } from "@/lib/action"
import React from "react"

export default async function ProList2() {
  const products = await getAllProducts2({})
  //console.log(products.length)
  return (
    <ul className="h-96 overflow-x-hidden overflow-y-scroll border-2 border-muted-foreground px-4 py-2">
      {products?.map((p) => (
        <li key={p.id}>
          {p.title} - ${p.price}
        </li>
      ))}
    </ul>
  )
}
