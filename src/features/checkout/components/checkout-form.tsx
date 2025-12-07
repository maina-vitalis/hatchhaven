"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MessageCircle, User } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useCart } from "@/src/context/cart-context";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const { items, cartTotal } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", phone: "" },
  });

  const onSubmit = (values: CheckoutFormValues) => {
    const message = `Hi, I'm ${values.name}!\n\nI'd like to order:\n\n${items
      .map((item) => `• ${item.name} x${item.quantity} - KES ${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")}\n\n*Total: KES ${cartTotal.toFixed(2)}*\n\nPhone: ${values.phone}`;

    const destination = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
    const whatsappUrl = `https://wa.me/${destination}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Your Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+1234567890" {...form.register("phone")} />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full text-lg h-12 bg-green-600 hover:bg-green-700">
        <MessageCircle className="mr-2 h-5 w-5" />
        Complete Order via WhatsApp
      </Button>
    </form>
  );
}
