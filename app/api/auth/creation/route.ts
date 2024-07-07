import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user === null || !user.id) {
    return NextResponse.json({ message: "No user login" })
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
  return NextResponse.redirect(process.env.KINDE_SITE_URL as string)
}
