import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Home, PlusSquare, Settings, Users } from "lucide-react"

const menuItems = [
  {
    title: "Ana Sayfa",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Kampanyalar",
    href: "/dashboard/kampanyalar",
    icon: BarChart3,
  },
  {
    title: "Yeni Kampanya",
    href: "/dashboard/kampanya-olustur",
    icon: PlusSquare,
  },
  {
    title: "Yatırımcılar",
    href: "/dashboard/yatirimcilar",
    icon: Users,
  },
  {
    title: "Ayarlar",
    href: "/dashboard/ayarlar",
    icon: Settings,
  },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden w-64 border-r bg-muted/40 lg:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted",
                  pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

