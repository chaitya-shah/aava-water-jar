"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, MapPin, Package, Truck, CheckCircle, Clock } from "lucide-react"

interface DeliveryStatus {
  status: "confirmed" | "preparing" | "out_for_delivery" | "delivered"
  estimatedTime: string
  driverName?: string
  driverPhone?: string
  vehicleNumber?: string
}

const deliverySteps = [
  {
    id: "confirmed",
    label: "Order Confirmed",
    description: "Your order has been received",
    icon: CheckCircle,
  },
  {
    id: "preparing",
    label: "Preparing Order",
    description: "Jars are being prepared for delivery",
    icon: Package,
  },
  {
    id: "out_for_delivery",
    label: "Out for Delivery",
    description: "Driver is on the way",
    icon: Truck,
  },
  {
    id: "delivered",
    label: "Delivered",
    description: "Order successfully delivered",
    icon: CheckCircle,
  },
]

export default function TrackDeliveryPage() {
  const router = useRouter()
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>({
    status: "out_for_delivery",
    estimatedTime: "30 minutes",
    driverName: "Rajesh Kumar",
    driverPhone: "+91 98765 43210",
    vehicleNumber: "KA 01 AB 1234",
  })
  const [deliveryAddress] = useState({
    name: "John Doe",
    street: "123 Main Street, Apt 4B",
    city: "Bangalore",
    pincode: "560001",
  })

  const getCurrentStepIndex = () => {
    return deliverySteps.findIndex((step) => step.id === deliveryStatus.status)
  }

  const currentStepIndex = getCurrentStepIndex()

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
        <h1 className="text-2xl font-bold">Track Delivery</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Estimated arrival: {deliveryStatus.estimatedTime}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Delivery Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {deliverySteps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = index <= currentStepIndex
                const isCurrent = index === currentStepIndex
                const isLast = index === deliverySteps.length - 1

                return (
                  <div key={step.id} className="relative">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.label}
                          </h3>
                          {isCurrent && (
                            <Badge variant="secondary" className="bg-accent text-accent-foreground">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>

                    {/* Connecting Line */}
                    {!isLast && (
                      <div
                        className={`absolute left-5 top-10 w-0.5 h-full -translate-x-1/2 ${
                          index < currentStepIndex ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Driver Info */}
        {deliveryStatus.status === "out_for_delivery" && (
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="text-lg">Delivery Partner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{deliveryStatus.driverName}</p>
                  <p className="text-sm text-muted-foreground">Vehicle: {deliveryStatus.vehicleNumber}</p>
                </div>
                <Button size="icon" variant="outline" asChild>
                  <a href={`tel:${deliveryStatus.driverPhone}`}>
                    <Phone className="w-4 h-4" />
                  </a>
                </Button>
              </div>
              <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <Clock className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-accent">Arriving Soon</p>
                  <p className="text-xs text-muted-foreground">
                    Your delivery will arrive in approximately {deliveryStatus.estimatedTime}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{deliveryAddress.name}</p>
              <p className="text-sm text-muted-foreground">{deliveryAddress.street}</p>
              <p className="text-sm text-muted-foreground">
                {deliveryAddress.city} - {deliveryAddress.pincode}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Live Map Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Live Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Map view coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">Need help with your delivery?</p>
            <Button variant="outline" asChild>
              <a href="tel:+918001234567">
                <Phone className="w-4 h-4 mr-2" />
                Contact Support
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
