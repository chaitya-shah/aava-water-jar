"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight, Droplets, Truck, Calendar } from "lucide-react"

const onboardingSlides = [
  {
    icon: Droplets,
    title: "Pure Water, Always Fresh",
    description: "Premium quality water delivered right to your doorstep in reusable 20L jars.",
  },
  {
    icon: Truck,
    title: "Track Your Delivery",
    description: "Real-time tracking and notifications so you always know when your water arrives.",
  },
  {
    icon: Calendar,
    title: "Flexible Subscriptions",
    description: "Choose from weekly, bi-weekly, or monthly plans. Pause anytime you need.",
  },
]

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      localStorage.setItem("aava_onboarding_complete", "true")
      router.push("/login")
    }
  }

  const handleSkip = () => {
    localStorage.setItem("aava_onboarding_complete", "true")
    router.push("/login")
  }

  const slide = onboardingSlides[currentSlide]
  const Icon = slide.icon

  return (
    <div className="flex flex-col min-h-screen bg-background p-6">
      {/* Skip button */}
      <div className="flex justify-end mb-8">
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Icon className="w-16 h-16 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-balance">{slide.title}</h1>
        <p className="text-lg text-muted-foreground max-w-sm text-pretty">{slide.description}</p>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mb-8">
        {onboardingSlides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"}`}
          />
        ))}
      </div>

      {/* Next button */}
      <Button onClick={handleNext} size="lg" className="w-full">
        {currentSlide === onboardingSlides.length - 1 ? "Get Started" : "Next"}
        <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  )
}
