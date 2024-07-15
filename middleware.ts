import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export default async function middleware(req: NextRequest) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (
    !user &&
    (req.nextUrl.pathname.startsWith("/ordres") ||
      req.nextUrl.pathname.startsWith("/checkout"))
  ) {
    return NextResponse.redirect(new URL("/", req.url))
  }
}

export const config = {
  matcher: ["/ordres", "/checkout"],
}
