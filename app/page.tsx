"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem("aava_onboarding_complete")
    const isLoggedIn = localStorage.getItem("aava_auth_token")

    if (!hasSeenOnboarding) {
      router.replace("/onboarding")
    } else if (!isLoggedIn) {
      router.replace("/login")
    } else {
      router.replace("/dashboard")
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-foreground">Aava</h1>
        <p className="text-primary-foreground/80 mt-2">Pure Water Delivered</p>
      </div>
    </div>
  )
}
