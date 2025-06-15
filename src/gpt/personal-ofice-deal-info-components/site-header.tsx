import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">Some Car Company Ltd.</span>
          </a>
          <nav className="flex items-center space-x-4 text-sm font-medium">
            <a href="#">Car Models Link</a>
            <a href="#">Personal Office Link</a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
