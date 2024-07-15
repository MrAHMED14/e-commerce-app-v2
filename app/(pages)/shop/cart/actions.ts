"use server"

import { createCart, getCart } from "@/lib/cart"
import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"

export async function resetCart(cartId: string) {
  if (!cartId) {
    return
  }
  await prisma.$transaction(async (tx) => {
    await tx.cartItem.deleteMany({
      where: {
        cartId,
      },
    })

    // Delete the cart
    await tx.cart.delete({
      where: {
        id: cartId,
      },
    })
  })
  revalidatePath("/shop/cart")
}

export async function deleteCartItem(productId: string) {
  try {
    const cart = (await getCart()) ?? (await createCart())

    const articleInCart = cart.items.find(
      (item) => item.productId === productId
    )

    if (articleInCart) {
      await prisma.cartItem.delete({
        where: { id: articleInCart.id },
      })
    }

    revalidatePath("/shop/cart")
  } catch (error) {
    console.error(error)
  }
}

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart())

  const articleInCart = cart.items.find((item) => item.productId === productId)

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cartItem.delete({
        where: { id: articleInCart.id },
      })
    }
  } else {
    if (articleInCart) {
      await prisma.cartItem.update({
        where: { id: articleInCart.id },
        data: { quantity },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      })
    }
  }

  revalidatePath("/shop/cart")
}
