"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Package, Calendar, Plus, MapPin, Pause, Play } from "lucide-react"
import Link from "next/link"

interface Subscription {
  id: string
  plan: string
  frequency: string
  nextDelivery: string
  status: "active" | "paused"
  jarsToReturn: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [upcomingDelivery, setUpcomingDelivery] = useState({
    date: "25 Nov 2024",
    time: "2:00 PM - 4:00 PM",
    address: "123 Main Street, Bangalore",
  })

  useEffect(() => {
    const authToken = localStorage.getItem("aava_auth_token")
    if (!authToken) {
      router.replace("/login")
      return
    }

    const savedSub = localStorage.getItem("aava_subscription")
    if (savedSub) {
      setSubscription(JSON.parse(savedSub))
    }
  }, [router])

  const handleTogglePause = () => {
    if (!subscription) return

    const updated = {
      ...subscription,
      status: subscription.status === "active" ? ("paused" as const) : ("active" as const),
    }
    setSubscription(updated)
    localStorage.setItem("aava_subscription", JSON.stringify(updated))
  }

  return (
    <div className="h-[calc(100dvh-64px)] bg-background flex flex-col">
      <div className="bg-primary text-primary-foreground px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold">Hello, User!</h1>
            <p className="text-primary-foreground/80 text-xs">Welcome back</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-primary-foreground/10 rounded-lg p-2.5 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-primary-foreground" />
            <div>
              <p className="text-lg font-bold text-primary-foreground leading-tight">{subscription ? "2" : "0"}</p>
              <p className="text-[10px] text-primary-foreground/70">Active Jars</p>
            </div>
          </div>
          <div className="bg-primary-foreground/10 rounded-lg p-2.5 flex items-center gap-2">
            <Package className="w-4 h-4 text-primary-foreground" />
            <div>
              <p className="text-lg font-bold text-primary-foreground leading-tight">
                {subscription?.jarsToReturn || 0}
              </p>
              <p className="text-[10px] text-primary-foreground/70">To Return</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-3 flex flex-col gap-3">
        {/* Subscription Status */}
        {subscription ? (
          <Card className="flex-1">
            <CardContent className="p-3 h-full flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Active Subscription</span>
                    <Badge
                      variant={subscription.status === "active" ? "default" : "secondary"}
                      className="text-[10px] px-1.5 py-0"
                    >
                      {subscription.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{subscription.plan}</p>
                </div>
                <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent" onClick={handleTogglePause}>
                  {subscription.status === "active" ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Button>
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between py-1 border-b">
                  <span className="text-xs text-muted-foreground">Frequency</span>
                  <span className="text-xs font-medium">{subscription.frequency}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b">
                  <span className="text-xs text-muted-foreground">Next Delivery</span>
                  <span className="text-xs font-medium">{subscription.nextDelivery}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-muted-foreground">Empty Jars</span>
                  <span className="text-xs font-medium text-accent">{subscription.jarsToReturn} to return</span>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent text-xs h-8" asChild>
                  <Link href="/subscription">Manage</Link>
                </Button>
                <Button size="sm" className="flex-1 text-xs h-8" asChild>
                  <Link href="/plans">
                    <Plus className="w-3 h-3 mr-1" />
                    Add More
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed flex-1">
            <CardContent className="h-full flex flex-col items-center justify-center text-center p-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                <Droplets className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-sm mb-1">No Active Subscription</h3>
              <p className="text-xs text-muted-foreground mb-3">Start your water delivery subscription today</p>
              <Button size="sm" className="text-xs h-8" asChild>
                <Link href="/plans">
                  <Plus className="w-3 h-3 mr-1" />
                  Browse Plans
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Delivery */}
        {subscription && subscription.status === "active" && (
          <Card className="bg-secondary shrink-0">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-semibold">Upcoming Delivery</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium">
                    {upcomingDelivery.date} • {upcomingDelivery.time}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">{upcomingDelivery.address}</p>
                </div>
                <Button variant="outline" size="sm" className="bg-transparent text-xs h-7 shrink-0" asChild>
                  <Link href="/track-delivery">Track</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!subscription && (
          <Card className="bg-secondary shrink-0">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Explore Our Plans</p>
                  <p className="text-xs text-muted-foreground">20L jars, bottles & more</p>
                </div>
                <Button size="sm" className="text-xs h-8" asChild>
                  <Link href="/plans">View Plans</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
