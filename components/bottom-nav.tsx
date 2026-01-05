"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Droplet, Sparkles, Truck, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: Droplet,
  },
  {
    label: "Plans",
    href: "/plans",
    icon: Sparkles,
  },
  {
    label: "Track",
    href: "/track-delivery",
    icon: Truck,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="mx-auto max-w-[480px] flex items-center justify-around px-4 py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 min-w-[60px] transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-6 w-6" strokeWidth={1.5} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
