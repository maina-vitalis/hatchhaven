import { CheckoutForm, OrderSummary } from "@/src/features/checkout";
import { Footer } from "@/src/features/shared";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-muted/10 flex flex-col">
      {/* Simple Header for Checkout */}
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shop
              </Link>
            </Button>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <h1 className="text-lg font-semibold hidden sm:block">Checkout</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <span className="hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Checkout Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Checkout</h2>
              <p className="text-muted-foreground">
                Complete your order by providing your details below.
              </p>
            </div>
            <CheckoutForm />
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <OrderSummary />
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  By placing this order, you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-primary">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline hover:text-primary">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
