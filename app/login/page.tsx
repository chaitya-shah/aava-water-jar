"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone } from "lucide-react"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store phone number and navigate to OTP verification
    localStorage.setItem("aava_phone_number", phoneNumber)
    router.push("/verify-otp")
    setIsLoading(false)
  }

  const isValidPhone = phoneNumber.length >= 10

  return (
    <div className="flex flex-col min-h-screen bg-background p-6">
      {/* Header */}
      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Aava</h1>
        <p className="text-muted-foreground">Pure Water Delivered</p>
      </div>

      {/* Login Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>Enter your phone number to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  className="pl-10"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={!isValidPhone || isLoading}>
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-auto pt-8 text-center">
        <p className="text-sm text-muted-foreground">By continuing, you agree to our Terms & Privacy Policy</p>
      </div>
    </div>
  )
}
