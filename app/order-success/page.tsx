"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, MapPin } from "lucide-react"

export default function OrderSuccessPage() {
  const router = useRouter()
  const [subscription, setSubscription] = useState<any>(null)

  useEffect(() => {
    const sub = localStorage.getItem("aava_subscription")
    if (sub) {
      setSubscription(JSON.parse(sub))
    }

    // Confetti or celebration effect could be added here
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center space-y-6">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>

          {/* Success Message */}
          <div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">Your subscription has been activated successfully</p>
          </div>

          {/* Order Details */}
          {subscription && (
            <div className="space-y-3 text-left bg-secondary p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">First Delivery</p>
                  <p className="font-medium">{subscription.nextDelivery}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <p className="font-medium">{subscription.plan}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button size="lg" className="w-full" onClick={() => router.push("/track-delivery")}>
              Track Delivery
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </div>

          {/* Info */}
          <p className="text-xs text-muted-foreground">You'll receive SMS and email updates about your delivery</p>
        </CardContent>
      </Card>
    </div>
  )
}
