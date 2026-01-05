"use client"

import type React from "react"

import { Analytics } from "@vercel/analytics/next"
import { usePathname } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"

// <CHANGE> Pages that should NOT show the bottom navigation
const pagesWithoutNav = [
  "/",
  "/onboarding",
  "/login",
  "/verify-otp",
  "/checkout",
  "/order-success",
  "/subscription",
  "/help",
  "/terms",
  "/privacy",
]

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showBottomNav = !pagesWithoutNav.includes(pathname)

  return (
    <>
      {/* <CHANGE> Conditional bottom padding based on nav visibility */}
      <div className={`mx-auto max-w-[480px] min-h-screen ${showBottomNav ? "pb-20" : ""}`}>{children}</div>
      {/* <CHANGE> Only show bottom nav on specific pages */}
      {showBottomNav && <BottomNav />}
      <Analytics />
    </>
  )
}
