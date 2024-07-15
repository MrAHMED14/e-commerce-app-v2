"use server"
import { createCart, getCart, prismaDynamicQuery, ShoppingCart } from "./cart"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"
import prisma from "./db"

export interface Address {
  street: string
  // city: string;
  // state: string;
  // postalCode: string;
  // country: string;
}

interface OrderRequest {
  userId: string
  order: ShoppingCart
  address: Address
}

export interface ProductFilterValues {
  query?: string | undefined
  category?: string | undefined
  subCategory?: string | undefined
  price?:
    | {
        gte?: number | undefined
        lte?: number | undefined
      }
    | undefined
  selectedOrder?:
    | {
        name: string | undefined
        value: Prisma.SortOrder | undefined
      }
    | undefined

  pagination?:
    | {
        currentPage: number
        totalPages: number
        skip: number
        take: number
      }
    | undefined
}

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart())

  const articleInCart = cart.items.find((item) => item.productId === productId)

  if (articleInCart) {
    await prisma.cartItem.update({
      where: { id: articleInCart.id },
      data: { quantity: { increment: 1 } },
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    })
  }
  revalidatePath("/shop/[id]", "page")
}

export async function createOrder(orderRequest: OrderRequest) {
  try {
    const { userId, order, address } = orderRequest

    // Fetch the user (validation step)
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new Error("User not found")
    }

    if (!order) {
      throw new Error("Order not found")
    }

    if (!address) {
      throw new Error("Address not found")
    }

    await prisma.$transaction(async (tx) => {
      // Create the address
      const addressRecord = await tx.address.create({
        data: {
          street: address.street,
          userId: user.id,
        },
      })

      // Create the order
      await tx.order.create({
        data: {
          userId: user.id,
          addressId: addressRecord.id,
          items: {
            create: order.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })

      // Delete the cart
      const cartId = order.id
      await tx.cartItem.deleteMany({
        where: {
          cartId,
        },
      })

      await tx.cart.delete({
        where: {
          id: cartId,
        },
      })
    })

    revalidatePath("/checkout")
    revalidatePath("/shop/cart")
  } catch (error) {
    console.error(error, "\nError creating order...")
  }
}

export async function getAllOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        address: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    })
    revalidatePath("/ordres")
    return orders
  } catch (error) {
    console.error(error, "\nError geting all orders...")
  }
}

export async function getProductById(id: string) {
  try {
    const productById = await prisma.product.findUnique({ where: { id } })

    return productById
  } catch (error) {
    console.error(error)
  }
}

export async function getCategoryAndSubcategoryById(id: string) {
  try {
    const categoryById = await prisma.subcategory.findUnique({
      where: { id },
      include: { mainCategory: true },
    })
    if (!categoryById) return null

    return {
      category: categoryById.mainCategory.name,
      subCategory: categoryById.name,
    }
  } catch (error) {
    console.error(error)
  }
}

export async function countProducts(filterValues: ProductFilterValues) {
  const { where } = prismaDynamicQuery(filterValues)

  const totalItemCount = await prisma.product.count({
    where,
  })
  return totalItemCount
}

export async function getAllProducts2(filterValues: ProductFilterValues) {
  const { where, orderBy, pagination } = prismaDynamicQuery(filterValues)

  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip: pagination?.skip,
    take: pagination?.take,
  })
  return products
}
