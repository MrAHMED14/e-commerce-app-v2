"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Loader2, Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useTransition } from "react"

const FormSchema = z.object({
  search: z.string(),
})

const SearchInput = ({ className }: { className?: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()!

  const page = searchParams.get("page")

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (page && page !== "1") {
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  })

  const [isPending, startTransition] = useTransition()
  function onSubmit({ search }: z.infer<typeof FormSchema>) {
    startTransition(() => {
      router.push(`/shop?${createQueryString("search", search.trim())}`)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "m-1 w-full flex items-center justify-center gap-2",
          className
        )}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Search for products ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Search size={18} />
          )}
        </Button>
      </form>
    </Form>
  )
}

export default SearchInput
