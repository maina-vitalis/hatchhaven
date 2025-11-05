"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Where does Hatch Haven source its poultry from?",
      answer:
        "All our poultry is raised on our own certified organic farms. We maintain complete control over the breeding, raising, and processing of our chickens to ensure the highest quality and ethical standards throughout the entire supply chain.",
    },
    {
      question: "Are your products organic and free-range?",
      answer:
        "Yes! All our products are certified organic and our chickens are raised in free-range environments with access to open pastures. We believe in ethical farming practices that prioritize animal welfare while delivering premium quality products.",
    },
    {
      question: "What is your delivery area and schedule?",
      answer:
        "We currently deliver to major metropolitan areas within a 100-mile radius of our farm. Deliveries are made twice weekly on Tuesdays and Fridays. Local customers can also arrange for direct pickup from our farm store.",
    },
    {
      question: "How do I place an order?",
      answer:
        "You can place orders through our website by selecting products and adding them to your cart, or by calling us directly at (555) 123-4567. We also accept orders via email at info@hatchhaven.com.",
    },
    {
      question: "Do you offer wholesale pricing for restaurants or businesses?",
      answer:
        "Yes, we have special pricing for wholesale customers including restaurants, markets, and food service businesses. Please contact our sales team at wholesale@hatchhaven.com to discuss your needs and pricing options.",
    },
    {
      question: "What makes your eggs different from store-bought eggs?",
      answer:
        "Our eggs come from free-range chickens that are raised on a natural diet without antibiotics or hormones. The hens have access to open pastures and are raised in smaller flocks, resulting in eggs with richer flavor, brighter yolks, and better nutritional profile.",
    },
    {
      question: "Are your products available year-round?",
      answer:
        "Yes, our core products including eggs and whole chickens are available year-round. Some specialty products may have seasonal availability. We recommend checking our product pages or contacting us for specific availability.",
    },
    {
      question: "What is your return or refund policy?",
      answer:
        "If you're not completely satisfied with your order, please contact us within 24 hours of delivery. We stand behind the quality of our products and will provide a full refund or replacement for any items that don't meet our standards.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-left pr-8">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-primary transition-transform duration-300 shrink-0 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CardContent>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
