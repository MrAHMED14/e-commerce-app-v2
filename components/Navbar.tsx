import { Suspense } from "react"
import SearchInput from "./SearchInput"

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Suspense>
        <SearchInput />
      </Suspense>
    </div>
  )
}

export default Navbar
