"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="bg-primary text-primary-foreground p-6">
        <Button
          variant="ghost"
          className="text-primary-foreground hover:bg-primary-foreground/10 mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Terms & Conditions</h1>
      </div>

      <div className="p-6">
        <Card>
          <CardContent className="pt-6 prose prose-sm max-w-none">
            <h2 className="text-lg font-semibold mb-3">1. Subscription Terms</h2>
            <p className="text-muted-foreground mb-4">
              By subscribing to Aava Water delivery service, you agree to receive regular deliveries as per your chosen
              plan. You may pause or cancel your subscription at any time.
            </p>

            <h2 className="text-lg font-semibold mb-3">2. Jar Returns</h2>
            <p className="text-muted-foreground mb-4">
              Empty jars must be returned during the next delivery. A refundable deposit is charged for new jars if you
              don't have empties to exchange.
            </p>

            <h2 className="text-lg font-semibold mb-3">3. Payment & Refunds</h2>
            <p className="text-muted-foreground mb-4">
              Payments are processed securely. Refunds for canceled subscriptions are processed within 7-10 business
              days. Jar deposits are refundable upon return.
            </p>

            <h2 className="text-lg font-semibold mb-3">4. Delivery Policy</h2>
            <p className="text-muted-foreground mb-4">
              We deliver within the specified time window. Rescheduling is available with 24 hours notice.
            </p>

            <p className="text-xs text-muted-foreground mt-6">Last updated: November 2024</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
