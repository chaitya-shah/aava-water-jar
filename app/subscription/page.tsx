"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Calendar, Pause, Play, Trash2 } from "lucide-react"
import Link from "next/link"

export default function SubscriptionPage() {
  const router = useRouter()
  const [subscription, setSubscription] = useState<any>(null)
  const [vacationMode, setVacationMode] = useState(false)

  useEffect(() => {
    const savedSub = localStorage.getItem("aava_subscription")
    if (savedSub) {
      setSubscription(JSON.parse(savedSub))
    } else {
      router.push("/plans")
    }
  }, [router])

  const handleTogglePause = () => {
    if (!subscription) return

    const updated = {
      ...subscription,
      status: subscription.status === "active" ? "paused" : "active",
    }
    setSubscription(updated)
    localStorage.setItem("aava_subscription", JSON.stringify(updated))
  }

  const handleCancelSubscription = () => {
    if (confirm("Are you sure you want to cancel your subscription?")) {
      localStorage.removeItem("aava_subscription")
      router.push("/dashboard")
    }
  }

  if (!subscription) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <Button
          variant="ghost"
          className="text-primary-foreground hover:bg-primary-foreground/10 mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Manage Subscription</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{subscription.plan}</CardTitle>
                <CardDescription>Delivery every {subscription.frequency.toLowerCase()}</CardDescription>
              </div>
              <Badge variant={subscription.status === "active" ? "default" : "secondary"}>{subscription.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Next Delivery</span>
              <span className="font-medium">{subscription.nextDelivery}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Monthly Cost</span>
              <span className="font-medium">₹{subscription.price || "800"}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Empty Jars to Return</span>
              <span className="font-medium text-accent">{subscription.jarsToReturn}</span>
            </div>
          </CardContent>
        </Card>

        {/* Pause/Resume */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pause Subscription</CardTitle>
            <CardDescription>Temporarily stop deliveries without canceling</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant={subscription.status === "active" ? "outline" : "default"}
              className="w-full"
              onClick={handleTogglePause}
            >
              {subscription.status === "active" ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Deliveries
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Resume Deliveries
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Vacation Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vacation Mode</CardTitle>
            <CardDescription>Schedule a pause for specific dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="vacation-mode">Enable Vacation Mode</Label>
              <Switch id="vacation-mode" checked={vacationMode} onCheckedChange={setVacationMode} />
            </div>
            {vacationMode && (
              <div className="space-y-3 pt-2">
                <div>
                  <Label className="text-sm">Start Date</Label>
                  <input type="date" className="w-full mt-1 px-3 py-2 border border-input rounded-md" />
                </div>
                <div>
                  <Label className="text-sm">End Date</Label>
                  <input type="date" className="w-full mt-1 px-3 py-2 border border-input rounded-md" />
                </div>
                <Button className="w-full">Save Dates</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Change Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Change Plan</CardTitle>
            <CardDescription>Switch to a different subscription plan</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/plans">
                <Calendar className="w-4 h-4 mr-2" />
                View All Plans
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Cancel Subscription */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-lg text-destructive">Cancel Subscription</CardTitle>
            <CardDescription>Permanently end your subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="w-full" onClick={handleCancelSubscription}>
              <Trash2 className="w-4 h-4 mr-2" />
              Cancel Subscription
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
