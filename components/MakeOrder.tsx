"use client"

import { Loader2 } from "lucide-react"
import { useTransition } from "react"
import { ShoppingCart } from "@/lib/cart"
import { Address, createOrder } from "@/lib/action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import toast from "react-hot-toast"

interface MakeOrderProps {
  userId: string
  cartItems: ShoppingCart
}

const formSchema = z.object({
  street: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
})

export default function MakeOrder({ cartItems, userId }: MakeOrderProps) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: "",
    },
  })

  function onSubmit({ street }: z.infer<typeof formSchema>) {
    const address: Address = { street }
    startTransition(async () => {
      await createOrder({ order: cartItems, userId, address })
      toast.success("You order was placed successfully")
    })
  }

  return (
    <div className="mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/3 space-y-8"
        >
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your address here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 font-semibold"
          >
            Make Order{" "}
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  )
}
