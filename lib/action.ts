"use server"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import prisma from "./db"

interface OrderItem {
  productId: string
  quantity: number
}

interface OrderRequest {
  userId: string
  order: OrderItem[]
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
}

export async function createOrder(orderRequest: OrderRequest) {
  try {
    const { userId, order } = orderRequest

    // Fetch the user (optional validation step)
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new Error("User not found")
    }

    // Create a new order
    const newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        items: {
          create: order.map((item) => ({
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

    return newOrder
  } catch (error) {
    console.error(error, "\nError creating order...")
  }
}

export async function getAllOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
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

export async function getAllCategory() {
  try {
    const category = await prisma.mainCategory.findMany({})

    return category
  } catch (error) {
    console.error(error)
  }
}

export async function getAllSubCategory(category?: string | undefined) {
  try {
    const where: Prisma.SubcategoryWhereInput | undefined = category
      ? {
          mainCategory: { name: category },
        }
      : {}
    const subCategory = await prisma.subcategory.findMany({ where })

    return subCategory
  } catch (error) {
    console.error(error)
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

export async function getProCatAndSubCatById(id: string) {
  try {
    const categoryById = await prisma.subcategory.findUnique({
      where: { id },
      include: { mainCategory: true },
    })

    console.log(categoryById)

    return categoryById
  } catch (error) {
    console.error(error)
  }
}

export async function getAllProducts2(filterValues: ProductFilterValues) {
  const { query, category, subCategory, selectedOrder, price } = filterValues
  //Problem price: min > max

  const searchString = query
    ?.replace(/&/g, "")
    .replace(/\|/g, "")
    .replace(/'/g, "")
    .split(" ")
    .filter((word) => word.length > 0)
    .join(" & ")

  const searchFilter: Prisma.ProductWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { description: { search: searchString } },
          { subcategory: { name: { search: searchString } } },
          { subcategory: { mainCategory: { name: { search: searchString } } } },
        ],
      }
    : {}

  const where: Prisma.ProductWhereInput = {
    AND: [
      searchFilter,

      subCategory && subCategory.length > 0
        ? { subcategory: { name: subCategory } }
        : {},

      category && category.length > 0
        ? { subcategory: { mainCategory: { name: category } } }
        : {},

      price ? { price } : {},
    ],
  }

  let orderBy:
    | Prisma.ProductOrderByWithRelationInput
    | Prisma.ProductOrderByWithRelationInput[]
    | undefined = {}
  if (selectedOrder?.name === "price") {
    orderBy = { price: selectedOrder.value }
  }

  const products = await prisma.product.findMany({
    where,
    orderBy,
  })
  return products
}
