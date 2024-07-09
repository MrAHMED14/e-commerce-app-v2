"use client"
import { useCallback, useState, useTransition } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

const SORT_OPTIONS = [
  { name: "None", value: "" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
] as const

export default function SortOptions() {
  const router = useRouter()
  const searchParams = useSearchParams()!

  const [filter, setFilter] = useState({
    sort: searchParams.get("sort") || "",
  })

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (!value.length) {
        params.delete(name)
      } else {
        params.set(name, value)
      }
      return params.toString()
    },
    [searchParams]
  )

  const [isPending, startTransition] = useTransition()
  console.log({ filter })

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={isPending}
          className="flex items-center justify-center text-sm font-medium"
        >
          Sort
          {!isPending && (
            <ChevronDown className="-mr-1 ml-1 h-4 w-4 flex-shrink-0" />
          )}
          {isPending && (
            <Loader2 className="animate-spin -mr-1 ml-1 h-4 w-4 flex-shrink-0" />
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.name}
              className={cn("text-left w-full block px-4 py-2 text-sm", {
                "text-gray-900 bg-gray-100": option.value === filter.sort,
                "text-gray-500": option.value !== filter.sort,
              })}
              onClick={() => {
                setFilter((prev) => ({
                  ...prev,
                  sort: option.value,
                }))

                startTransition(() => {
                  router.push(
                    `/shop?${createQueryString("sort", option.value)}`
                  )
                })
              }}
            >
              {option.name}
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
