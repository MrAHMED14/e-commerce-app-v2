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

  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const router = useRouter()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (!value.length) {
        params.delete(name)
      } else {
        params.set(name, value)
      }
      return params.toString()
    },
    [searchParams]
  )

  const updateRoute = useCallback(
    (queryString: string) => {
      startTransition(() => {
        router.push(`/shop?${queryString}`, { scroll: true })
      })
    },
    [router]
  )

  const handlePageChange = useCallback(
    (page: number) => {
      updateRoute(createQueryString("page", page.toString()))
    },
    [createQueryString, updateRoute]
  )

  const numberedPageItems: JSX.Element[] = []

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <PaginationItem key={page}>
        <span
          onClick={() => handlePageChange(page)}
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
    <div className="flex flex-col gap-y-2 items-center my-10">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <span
                onClick={() => handlePageChange(currentPage - 1)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
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
                onClick={() => handlePageChange(currentPage + 1)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
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
      <div
        className={cn(
          buttonVariants({ variant: "outline" }),
          "hidden",
          isPending && "block"
        )}
      >
        {isPending && (
          <span className="flex items-center gap-2">
            Loading <Loader2 className="h-4 w-4 animate-spin" />
          </span>
        )}
      </div>
    </div>
  )
}
