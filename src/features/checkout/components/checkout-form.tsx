"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CreditCard, Truck, MapPin, User, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Zip code is required"),
  paymentMethod: z.enum(["card", "paypal"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"details" | "confirmation">("details");

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      paymentMethod: "card",
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setStep("confirmation");
    toast.success("Order placed successfully!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (step === "confirmation") {
    return (
      <Card className="border-green-500/20 bg-green-50/10">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Thank you for your purchase. We have sent a confirmation email to{" "}
              <span className="font-medium text-foreground">
                {form.getValues("email")}
              </span>
              .
            </p>
          </div>
          <div className="p-4 bg-background rounded-lg border max-w-sm mx-auto text-left text-sm">
            <p className="font-medium mb-1">Order #HH-7829</p>
            <p className="text-muted-foreground">
              Estimated Delivery: <span className="text-foreground">Nov 28 - Nov 30</span>
            </p>
          </div>
          <Button onClick={() => window.location.href = "/products"} className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...form.register("firstName")}
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...form.register("lastName")}
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="123 Farm Lane"
              {...form.register("address")}
            />
            {form.formState.errors.address && (
              <p className="text-sm text-destructive">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="New York"
                {...form.register("city")}
              />
              {form.formState.errors.city && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.city.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="NY"
                {...form.register("state")}
              />
              {form.formState.errors.state && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              placeholder="10001"
              {...form.register("zipCode")}
            />
            {form.formState.errors.zipCode && (
              <p className="text-sm text-destructive">
                {form.formState.errors.zipCode.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Method
          </CardTitle>
          <CardDescription>
            All transactions are secure and encrypted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue="card"
            onValueChange={(val) =>
              form.setValue("paymentMethod", val as "card" | "paypal")
            }
            className="grid gap-4"
          >
            <Label
              htmlFor="card"
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent cursor-pointer [&:has(:checked)]:border-primary [&:has(:checked)]:bg-accent"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="card" id="card" />
                <span>Credit Card</span>
              </div>
              <div className="flex gap-1">
                <div className="h-6 w-8 bg-gray-200 rounded"></div>
                <div className="h-6 w-8 bg-gray-200 rounded"></div>
                <div className="h-6 w-8 bg-gray-200 rounded"></div>
              </div>
            </Label>
            
            {/* Card Details Placeholder */}
            {form.watch("paymentMethod") === "card" && (
              <div className="grid gap-4 p-4 border rounded-lg bg-muted/20 animate-in slide-in-from-top-2">
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVC</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            <Label
              htmlFor="paypal"
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent cursor-pointer [&:has(:checked)]:border-primary [&:has(:checked)]:bg-accent"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <span>PayPal</span>
              </div>
              <div className="h-6 w-16 bg-blue-100 rounded flex items-center justify-center text-xs font-bold text-blue-800">
                PayPal
              </div>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full text-lg h-12" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing Order...
          </>
        ) : (
          "Place Order"
        )}
      </Button>
    </form>
  );
}
