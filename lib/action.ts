"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "./db"
import { NextResponse } from "next/server"

interface OrderItem {
  productId: string
  quantity: number
}

interface OrderRequest {
  userId: string
  order: OrderItem[]
}
/*
export async function createUser() {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || user === null || !user.id) {
      return
    }

    let dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name as string,
          lastName: user.family_name as string,
          email: user.email as string,
          avatar: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        },
      })
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 200 }
    )
  } catch (error) {
    console.error(error, "\nError creating usr...")
  }
}
*/
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

export async function getAllProducts() {
  try {
    const product = await prisma.product.findMany()

    return product
  } catch (error) {
    console.error(error, "\nError geting all products...")
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
    return orders
  } catch (error) {
    console.error(error, "\nError geting all orders...")
  }
}
