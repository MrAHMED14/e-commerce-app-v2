"use client"

import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useTransition } from "react"
import { Input } from "./ui/input"
import Select from "./ui/select"
import { Button } from "./ui/button"

const categories = [
  { name: "Electronics" },
  { name: "Books" },
  { name: "Fashion" },
]
const subCategories = [
  { name: "Smartphones" },
  { name: "Fiction" },
  { name: "Non-Fiction" },
  { name: "Laptops" },
  { name: "Clothing" },
]

export default function Filtre() {
  const router = useRouter()
  const searchParams = useSearchParams()!
  const page = searchParams.get("page")

  const [isCatPending, startCatTransition] = useTransition()
  const [isSubCatPending, startSubCatTransition] = useTransition()
  const [isAvailPending, startAvailTransition] = useTransition()
  const [isMinPending, startMinTransition] = useTransition()
  const [isMaxPending, startMaxTransition] = useTransition()

  const currentCategory = searchParams.get("category") as string
  const currentAvailable = searchParams.get("available") as string
  const currentSubCategory = searchParams.get("subCategory") as string
  const currentMaxPrice = searchParams.get("max") as string
  const currentMinPrice = searchParams.get("min") as string

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (
        (name === "category" || name === "subCategory") &&
        page &&
        page !== "1"
      ) {
        params.delete("page")
      }
      if (!value.length) {
        params.delete(name)
      } else {
        params.set(name, value)
      }
      return params.toString()
    },
    [searchParams, page]
  )

  return (
    <>
      <div className="mt-2 flex flex-col gap-2 w-full">
        <Select
          disabled={isCatPending}
          defaultValue={currentCategory}
          onChange={(e) => {
            startCatTransition(() => {
              router.push(
                `/shop?${createQueryString("category", e.currentTarget.value)}`,
                {
                  scroll: false,
                }
              )
            })
          }}
        >
          <option value="">All Category</option>
          {categories.map((category) => (
            <option className="py-5" key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </Select>

        <Select
          disabled={isSubCatPending}
          defaultValue={currentSubCategory}
          onChange={(e) => {
            startSubCatTransition(() => {
              router.push(
                `/shop?${createQueryString(
                  "subCategory",
                  e.currentTarget.value
                )}`,
                {
                  scroll: false,
                }
              )
            })
          }}
        >
          <option value="">All Sub Category</option>
          {subCategories.map((subCategory) => (
            <option key={subCategory.name} value={subCategory.name}>
              {subCategory.name}
            </option>
          ))}
        </Select>

        <div className="flex gap-2">
          <input
            type="checkbox"
            className="accent-white"
            name="available"
            id="available"
            defaultChecked={currentAvailable === "true" ? true : false}
            onChange={(e) => {
              startAvailTransition(() => {
                const checked = e.currentTarget.checked === true ? "true" : ""
                router.push(
                  `/shop?${createQueryString("available", checked)}`,
                  {
                    scroll: false,
                  }
                )
              })
            }}
          />
          <label htmlFor="available">
            <span className="flex items-center gap-2">
              Available
              {isAvailPending && <Loader2 className="h-4 w-4 animate-spin" />}
            </span>
          </label>
        </div>

        <div className="">
          <label htmlFor="">
            <span className="flex items-center gap-2">
              Price
              {(isMaxPending || isMinPending) && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
            </span>
          </label>
          <div className="flex gap-3">
            <Input
              defaultValue={currentMinPrice}
              placeholder="min"
              type="number"
              onChange={(e) => {
                ;(parseInt(e.currentTarget.value) >= 0 ||
                  e.currentTarget.value === "") &&
                  startMinTransition(() => {
                    router.push(
                      `/shop?${createQueryString(
                        "min",
                        e.currentTarget.value
                      )}`,
                      {
                        scroll: false,
                      }
                    )
                  })
              }}
            />

            <Input
              defaultValue={currentMaxPrice}
              type="number"
              className="appearance-none"
              placeholder="max"
              onChange={(e) => {
                ;(parseInt(e.currentTarget.value) >= 0 ||
                  e.currentTarget.value === "") &&
                  startMaxTransition(() => {
                    router.push(
                      `/shop?${createQueryString(
                        "max",
                        e.currentTarget.value
                      )}`,
                      {
                        scroll: false,
                      }
                    )
                  })
              }}
            />
          </div>
        </div>

        {/* <div className="">
          <Button
            className="w-full mt-2 font-semibold"
            onClick={() => {
              router.push(
                `/shop?${
                  searchParams.get("search")
                    ? "search=" + searchParams.get("search")
                    : ""
                }`
              )
              router.refresh()
            }}
          >
            Rest
          </Button>
        </div> */}
      </div>
    </>
  )
}
