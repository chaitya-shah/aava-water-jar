"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check } from "lucide-react"

interface Plan {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  frequency: string
  jars: number
  features: string[]
  popular?: boolean
  discount?: string
}

const jarPlans: Plan[] = [
  {
    id: "weekly-2jar",
    name: "Weekly Plan",
    description: "2 jars every week",
    price: 800,
    frequency: "Weekly",
    jars: 2,
    features: ["2 x 20L jars per week", "Free delivery", "Return empty jars", "Pause anytime"],
  },
  {
    id: "biweekly-4jar",
    name: "Bi-Weekly Plan",
    description: "4 jars every 2 weeks",
    price: 1500,
    originalPrice: 1600,
    frequency: "Bi-Weekly",
    jars: 4,
    features: ["4 x 20L jars per 2 weeks", "Free delivery", "Priority support", "Flexible scheduling"],
    popular: true,
    discount: "₹100 OFF",
  },
  {
    id: "monthly-8jar",
    name: "Monthly Plan",
    description: "8 jars per month",
    price: 2800,
    originalPrice: 3200,
    frequency: "Monthly",
    jars: 8,
    features: ["8 x 20L jars per month", "Free delivery", "Best value", "Cancel anytime"],
    discount: "₹400 OFF",
  },
]

export default function PlansPage() {
  const router = useRouter()

  const handleSelectPlan = (plan: Plan) => {
    localStorage.setItem("aava_selected_plan", JSON.stringify(plan))
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <Button
          variant="ghost"
          className="text-primary-foreground hover:bg-primary-foreground/10 mb-2 -ml-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-xl font-bold">Choose Your Plan</h1>
        <p className="text-primary-foreground/80 text-sm">Select a subscription that fits your needs</p>
      </div>

      <div className="p-4 space-y-4">
        <div className="text-center mb-2">
          <h2 className="text-lg font-semibold">20L Jar Subscriptions</h2>
          <p className="text-xs text-muted-foreground">Perfect for families and offices</p>
        </div>

        {jarPlans.map((plan) => (
          <Card key={plan.id} className={plan.popular ? "border-primary border-2 relative" : ""}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-accent">Most Popular</Badge>
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  <CardDescription className="text-xs">{plan.description}</CardDescription>
                </div>
                {plan.discount && (
                  <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
                    {plan.discount}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">₹{plan.price}</span>
                {plan.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">₹{plan.originalPrice}</span>
                )}
                <span className="text-xs text-muted-foreground">/{plan.frequency.toLowerCase()}</span>
              </div>

              <ul className="grid grid-cols-2 gap-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-1 text-xs">
                    <Check className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                size="sm"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan)}
              >
                Select Plan
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* One-time order option */}
        <Card className="border-dashed">
          <CardContent className="py-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">Need water just once? Try our one-time delivery</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const oneTimePlan = {
                  id: "onetime",
                  name: "One-time Order",
                  price: 100,
                  frequency: "One-time",
                  jars: 1,
                  features: ["1 x 20L jar", "No subscription needed"],
                }
                handleSelectPlan(oneTimePlan)
              }}
            >
              Order Once
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
