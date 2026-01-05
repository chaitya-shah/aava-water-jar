"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [phoneNumber, setPhoneNumber] = useState("")
  const router = useRouter()

  useEffect(() => {
    const phone = localStorage.getItem("aava_phone_number")
    if (!phone) {
      router.replace("/login")
      return
    }
    setPhoneNumber(phone)
  }, [router])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }

    // Auto-submit when all filled
    if (index === 5 && value && newOtp.every((digit) => digit)) {
      handleVerify(newOtp)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = async (otpToVerify = otp) => {
    setIsLoading(true)

    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store auth token
    localStorage.setItem("aava_auth_token", "demo_token_" + Date.now())
    router.push("/dashboard")
    setIsLoading(false)
  }

  const handleResend = () => {
    setCountdown(30)
    setOtp(["", "", "", "", "", ""])
    // In production, trigger OTP resend API call
  }

  return (
    <div className="flex flex-col min-h-screen bg-background p-6">
      {/* Back button */}
      <Button variant="ghost" className="self-start mb-8" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Verify OTP</h1>
        <p className="text-muted-foreground">Enter the 6-digit code sent to</p>
        <p className="font-medium text-foreground mt-1">+91 {phoneNumber}</p>
      </div>

      {/* OTP Input */}
      <Card className="w-full mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-3 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-semibold border-2 border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            ))}
          </div>

          <Button
            onClick={() => handleVerify()}
            className="w-full"
            size="lg"
            disabled={otp.some((digit) => !digit) || isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </CardContent>
      </Card>

      {/* Resend */}
      <div className="text-center">
        {countdown > 0 ? (
          <p className="text-sm text-muted-foreground">Resend OTP in {countdown}s</p>
        ) : (
          <Button variant="link" onClick={handleResend} className="text-primary">
            Resend OTP
          </Button>
        )}
      </div>
    </div>
  )
}
