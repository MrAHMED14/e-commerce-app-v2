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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { LogOut, UserCircle2Icon } from "lucide-react"
import { getCart } from "@/lib/cart"

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const cart = await getCart()

  return (
    <div className="sm:container w-full flex items-center justify-between">
      <div className="w-full hidden md:flex">
        <MenuItems cartSize={cart?.size} />
      </div>
      <Suspense>
        <SearchInput />
      </Suspense>
      <div className="w-full flex items-center justify-end">
        <div className="flex items-center gap-3">
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
