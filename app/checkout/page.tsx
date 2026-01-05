"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, CreditCard, Wallet, Calendar, AlertCircle } from "lucide-react"

interface SelectedPlan {
  id: string
  name: string
  price: number
  originalPrice?: number
  frequency: string
  jars: number
  features: string[]
  discount?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null)
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "123 Main Street",
    city: "Bangalore",
    pincode: "560001",
    phone: "9876543210",
  })
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [emptyJars, setEmptyJars] = useState(0)
  const [startDate, setStartDate] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const plan = localStorage.getItem("aava_selected_plan")
    if (!plan) {
      router.push("/plans")
      return
    }
    setSelectedPlan(JSON.parse(plan))

    // Set default start date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setStartDate(tomorrow.toISOString().split("T")[0])
  }, [router])

  const calculateTotal = () => {
    if (!selectedPlan) return 0
    const subtotal = selectedPlan.price
    const deposit = emptyJars > 0 ? 0 : 200 // Deposit if no jars to return
    return subtotal + deposit
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Save subscription
    const subscription = {
      id: "sub_" + Date.now(),
      plan: selectedPlan?.name,
      frequency: selectedPlan?.frequency,
      nextDelivery: startDate,
      status: "active",
      jarsToReturn: emptyJars,
      price: selectedPlan?.price,
    }
    localStorage.setItem("aava_subscription", JSON.stringify(subscription))

    // Navigate to success page
    router.push("/order-success")
  }

  if (!selectedPlan) return null

  const savings = selectedPlan.originalPrice ? selectedPlan.originalPrice - selectedPlan.price : 0

  return (
    <div className="min-h-screen bg-background pb-6">
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
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order Summary</span>
              {selectedPlan.discount && <Badge className="bg-accent">{selectedPlan.discount}</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">{selectedPlan.name}</span>
              <span className="font-semibold">₹{selectedPlan.price}</span>
            </div>
            {selectedPlan.originalPrice && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Original Price</span>
                <span className="line-through">₹{selectedPlan.originalPrice}</span>
              </div>
            )}
            {savings > 0 && (
              <div className="flex justify-between text-sm text-accent">
                <span>You Save</span>
                <span className="font-semibold">₹{savings}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Start Date */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Start Date
            </CardTitle>
            <CardDescription>When should we start your deliveries?</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </CardContent>
        </Card>

        {/* Empty Jars */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Empty Jars to Return</CardTitle>
            <CardDescription>Do you have empty jars from previous orders?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => setEmptyJars(Math.max(0, emptyJars - 1))}>
                -
              </Button>
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold">{emptyJars}</p>
                <p className="text-sm text-muted-foreground">jars</p>
              </div>
              <Button variant="outline" size="icon" onClick={() => setEmptyJars(emptyJars + 1)}>
                +
              </Button>
            </div>
            {emptyJars === 0 && (
              <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                <p className="text-sm text-muted-foreground">A refundable deposit of ₹200 will be added for new jars</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                value={deliveryAddress.street}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={deliveryAddress.city}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={deliveryAddress.pincode}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Contact Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={deliveryAddress.phone}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    <span>UPI / GPay / PhonePe</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit Card</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  <span>Cash on Delivery</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Place Order Button */}
        <Button size="lg" className="w-full" onClick={handlePlaceOrder} disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay ₹${calculateTotal()}`}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By placing this order, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  )
}
