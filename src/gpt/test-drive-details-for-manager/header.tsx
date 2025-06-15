import { User } from "lucide-react"


export function Header() {
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
      <a href="#" className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4">
        <span className="text-xl font-bold">Some Car Company Ltd. Manager Panel</span>
      </a>
      <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <User className="w-6 h-6 ml-auto" />
        <span className="sr-only">User Profile</span>
      </div>
    </header>
  )
}
