import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
            <Mail className="h-8 w-8" />
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg mb-8 text-white/80">
            Get the latest updates on new products, special offers, and farm
            news delivered to your inbox
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
            />
            <Button className="bg-white text-primary hover:bg-white/90 whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>

          <p className="text-xs text-white/60 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
