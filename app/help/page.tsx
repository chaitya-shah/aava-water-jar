"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Phone, Mail, MessageCircle } from "lucide-react"

const faqs = [
  {
    question: "How do I pause my subscription?",
    answer: "Go to Dashboard > Manage Subscription > Pause Deliveries. You can resume anytime from the same page.",
  },
  {
    question: "What is the jar return policy?",
    answer:
      "Empty jars must be returned on the next delivery. If you have no jars to return initially, a refundable deposit of ₹200 is charged.",
  },
  {
    question: "How do I change my delivery address?",
    answer: "Go to Profile > Saved Addresses and add or edit your delivery locations.",
  },
  {
    question: "Can I get a one-time delivery?",
    answer:
      'Yes! Browse our plans and select "Order Once" at the bottom of the page for a single delivery without subscription.',
  },
  {
    question: "How does vacation mode work?",
    answer:
      "Enable vacation mode in Manage Subscription to pause deliveries for specific dates. Your subscription will automatically resume after the vacation period.",
  },
  {
    question: "What are the payment options?",
    answer: "We accept UPI, credit/debit cards, and cash on delivery for all orders.",
  },
]

export default function HelpPage() {
  const router = useRouter()

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
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">We're here to help you</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Contact Options */}
        <div className="grid grid-cols-1 gap-3">
          <Card>
            <CardContent className="pt-6">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <a href="tel:+918001234567">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us: 1800-123-4567
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <a href="mailto:support@aavawater.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Email: support@aavawater.com
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Support Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monday - Friday</span>
              <span className="font-medium">9:00 AM - 7:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Saturday</span>
              <span className="font-medium">10:00 AM - 5:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sunday</span>
              <span className="font-medium">Closed</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
