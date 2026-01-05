"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  User,
  MapPin,
  Bell,
  CreditCard,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
  })
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    reminders: true,
  })

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear()
      router.push("/login")
    }
  }

  const handleSaveProfile = () => {
    // In production, this would save to backend
    alert("Profile updated successfully!")
  }

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
        <h1 className="text-2xl font-bold">Profile & Settings</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="pl-10"
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Contact support to change phone number</p>
            </div>
            <Button onClick={handleSaveProfile} className="w-full">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Saved Addresses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Saved Addresses
              </CardTitle>
              <Button variant="ghost" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <p className="font-medium text-sm">Home</p>
                <p className="text-sm text-muted-foreground">123 Main Street, Bangalore - 560001</p>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                + Add New Address
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="order-updates" className="font-medium">
                  Order Updates
                </Label>
                <p className="text-sm text-muted-foreground">Get notified about order status</p>
              </div>
              <Switch
                id="order-updates"
                checked={notifications.orderUpdates}
                onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotions" className="font-medium">
                  Promotions
                </Label>
                <p className="text-sm text-muted-foreground">Receive offers and discounts</p>
              </div>
              <Switch
                id="promotions"
                checked={notifications.promotions}
                onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reminders" className="font-medium">
                  Delivery Reminders
                </Label>
                <p className="text-sm text-muted-foreground">Reminders before delivery</p>
              </div>
              <Switch
                id="reminders"
                checked={notifications.reminders}
                onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Methods
              </CardTitle>
              <Button variant="ghost" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">UPI</p>
                  <p className="text-sm text-muted-foreground">john@upi</p>
                </div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                + Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardContent className="pt-6 space-y-2">
            <Button variant="ghost" className="w-full justify-between" asChild>
              <Link href="/help">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help & Support</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-between" asChild>
              <Link href="/terms">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Terms & Conditions</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-between" asChild>
              <Link href="/privacy">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground">Aava Water App v1.0.0</p>
      </div>
    </div>
  )
}
