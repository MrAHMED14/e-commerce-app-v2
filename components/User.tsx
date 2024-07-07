import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { Button } from "./ui/button"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const User = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold dark:text-rose-500">User</h1>
      {!user ? (
        <div className="flex gap-3">
          <LoginLink>
            <Button className="font-bold">Login</Button>
          </LoginLink>
          <RegisterLink>
            <Button className="font-bold">Sign in</Button>
          </RegisterLink>
        </div>
      ) : (
        <div className="space-y-2">
          <h1>
            Current user: {user.given_name} {user.family_name}
          </h1>
          {/* <img src={user.picture as string} alt="usr" className="rounded" /> */}
          <div className="">
            <LogoutLink>
              <Button className="font-bold">LogOut</Button>
            </LogoutLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default User
