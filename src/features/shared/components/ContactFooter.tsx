import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/src/components/ui/separator";
import { InstagramFeed } from "./InstagramFeed";

interface Product {
  name: string;
  price: string;
  image: string;
}

export function ContactFooter() {
  const products: Product[] = [
    {
      name: "Raw Chicken Broiler",
      price: "$24.99",
      image:
        "https://images.unsplash.com/photo-1672787153655-0c19308dcc60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aG9sZSUyMGNoaWNrZW4lMjByYXd8ZW58MXx8fHwxNzYxMzc3NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "Light Brown Eggs",
      price: "$25.99",
      image:
        "https://images.unsplash.com/photo-1585355611444-06154f329e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZWdncyUyMGNhcnRvbnxlbnwxfHx8fDE3NjEzNzc3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <footer className="bg-muted text-foreground border-t">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-center md:text-left">
          {/* Brand & Description */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <span className="text-primary-foreground text-xl">🐔</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-foreground">Hatch Haven</span>
                <span className="text-xs text-muted-foreground">
                  Fresh & Ethical
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Committed to providing the finest quality poultry and eggs through
              ethical farming practices and sustainable agriculture.
            </p>
          </div>

          {/* Keep In Touch */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-6 font-semibold">Keep In Touch</h3>
            <div className="space-y-4 text-sm w-full max-w-xs mx-auto md:mx-0">
              <div className="flex items-start gap-3 justify-center md:justify-start text-left">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p>Sector # 48,173 Wolfe Street,</p>
                  <p>Melborn city, Australia</p>
                </div>
              </div>
              <div className="flex items-start gap-3 justify-center md:justify-start text-left">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p>+88678-658-125, 0078-98-954</p>
                  <p>+1655-456-523</p>
                </div>
              </div>
              <div className="flex items-start gap-3 justify-center md:justify-start text-left">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p>info@hatchhaven.com</p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-6 font-semibold">Featured Products</h3>
            <div className="space-y-4 w-full max-w-xs mx-auto md:mx-0">
              {products.map((product, index) => (
                <div key={index} className="flex gap-4 text-left">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="text-sm mb-1 font-medium">{product.name}</h4>
                    <p className="text-primary font-bold">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instagram Feed */}
          <div className="flex flex-col items-center md:items-start">
            <InstagramFeed />
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 Hatch Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
