import type React from "react"
import { cn } from "@/lib/utils"

interface MobileContainerProps {
  children: React.ReactNode
  className?: string
  hasBottomNav?: boolean
}

export function MobileContainer({ children, className, hasBottomNav = true }: MobileContainerProps) {
  return (
    <div className={cn("mx-auto max-w-[480px] min-h-screen", hasBottomNav ? "pb-20" : "", className)}>{children}</div>
  )
}
