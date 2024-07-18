import { Suspense } from "react"
import SearchInput from "./SearchInput"
import MenuItems from "./MenuItems"
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { Button } from "./ui/button"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import ThemeSwitch from "./ThemeSwitch"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Loader2, LogOut, Menu, UserCircle2Icon } from "lucide-react"
import { getCart } from "@/lib/cart"

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const cart = await getCart()

  return (
    <div className="container w-full flex items-center justify-between my-4">
      <div className="w-full hidden md:flex">
        <MenuItems cartSize={cart?.size} />
      </div>
      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col items-start gap-y-5">
              <Suspense fallback={<Loader2 className="h-4 w-4 animate-spin" />}>
                <SearchInput className="w-full md:hidden flex mt-10" />
              </Suspense>
              <MenuItems
                className="flex flex-col justify-center items-start gap-y-10"
                cartSize={cart?.size}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="w-full flex items-center justify-end">
        <div className="flex items-center gap-3">
          <Suspense fallback={<Loader2 className="h-4 w-4 animate-spin" />}>
            <SearchInput className="w-full hidden lg:flex" />
          </Suspense>
          <ThemeSwitch />
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-9 h-9 aspect-square object-center">
                  {user.picture && (
                    <Image
                      src={user.picture}
                      alt={user.given_name || "user_img"}
                      width={500}
                      height={500}
                      className="object-cover w-full h-full rounded-full"
                    />
                  )}
                  {!user.picture && (
                    <div className="dark:bg-white bg-stone-500 w-9 h-9 rounded-full aspect-square object-center flex items-center justify-center">
                      <UserCircle2Icon className="dark:text-stone-950 text-white" />
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-7">
                <DropdownMenuLabel>
                  {user.given_name + " " + user.family_name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <LogOut size={18} />
                  <LogoutLink>Logout</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!user && (
            <div className="flex gap-3">
              <LoginLink>
                <Button
                  variant="ghost"
                  className="font-bold hover:bg-muted-foreground/40"
                >
                  Login
                </Button>
              </LoginLink>
              <RegisterLink>
                <Button className="font-bold">Sign in</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
