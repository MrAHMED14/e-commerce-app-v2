"use client"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react"
import { buttonVariants } from "./ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useTransition } from "react"

interface PaginationBarProps {
  currentPage: number
  totalPages: number
}

export default function ProPagination({
  currentPage,
  totalPages,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10))
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9))
  const searchParams = useSearchParams()
  const router = useRouter()

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

  const numberedPageItems: JSX.Element[] = []

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <PaginationItem key={page}>
        <span
          onClick={() => {
            router.push(`/shop?${createQueryString("page", page.toString())}`)
          }}
          className={cn(
            buttonVariants({
              variant: currentPage === page ? "outline" : "ghost",
            }),
            currentPage === page ? "pointer-events-none" : "cursor-pointer"
          )}
        >
          {page}
        </span>
      </PaginationItem>
    )
  }
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <span
                onClick={() => {
                  router.push(
                    `/shop?${createQueryString(
                      "page",
                      (currentPage - 1).toString()
                    )}`
                  )
                }}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "flex items-center gap-2 cursor-pointer"
                )}
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span>Previous</span>
              </span>
            </PaginationItem>
          )}

          {numberedPageItems}

          {currentPage < totalPages && (
            <PaginationItem>
              <span
                onClick={() => {
                  router.push(
                    `/shop?${createQueryString(
                      "page",
                      (currentPage + 1).toString()
                    )}`
                  )
                }}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "flex items-center gap-2 cursor-pointer"
                )}
              >
                <span>Next</span>
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
