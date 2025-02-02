import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Ardventure KFS</span>
          </Link>
        </div>
        <Button variant="outline" size="icon" className="mr-6 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menüyü Aç/Kapat</span>
        </Button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              Çıkış Yap
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

