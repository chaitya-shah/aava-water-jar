"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
      </div>

      <div className="p-6">
        <Card>
          <CardContent className="pt-6 prose prose-sm max-w-none">
            <h2 className="text-lg font-semibold mb-3">Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect your name, phone number, email, and delivery address to provide our services. Payment
              information is processed securely through our payment partners.
            </p>

            <h2 className="text-lg font-semibold mb-3">How We Use Your Data</h2>
            <p className="text-muted-foreground mb-4">
              Your information is used to process orders, schedule deliveries, and send you important updates about your
              subscription. We never sell your data to third parties.
            </p>

            <h2 className="text-lg font-semibold mb-3">Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement industry-standard security measures to protect your personal information. All data is
              encrypted and stored securely.
            </p>

            <h2 className="text-lg font-semibold mb-3">Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to access, update, or delete your personal information at any time. Contact our support
              team for assistance.
            </p>

            <p className="text-xs text-muted-foreground mt-6">Last updated: November 2024</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
