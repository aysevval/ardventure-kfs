import { SideNav } from "@/components/ui/dashboard/side-nav"
import { TopNav } from "@/components/ui/dashboard/top-nav"
import type React from "react" 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="flex">
        <SideNav />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}