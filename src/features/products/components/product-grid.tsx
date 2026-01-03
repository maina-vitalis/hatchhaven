import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/src/lib/utils";

interface Product {
  id: number;
  slug: string; // Add slug field
  name: string;
  price: number;
  image: string;
}

export function ProductGrid() {
  const products: Product[] = [
    {
      id: 1,
      slug: "whole-chicken",
      name: "Whole Chicken",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1672787153655-0c19308dcc60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aG9sZSUyMGNoaWNrZW4lMjByYXd8ZW58MXx8fHwxNzYxMzc3NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      slug: "farm-fresh-eggs",
      name: "Farm Fresh Eggs",
      price: 6.99,
      image:
        "https://images.unsplash.com/photo-1585355611444-06154f329e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZWdncyUyMGNhcnRvbnxlbnwxfHx8fDE3NjEzNzc3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      slug: "chicken-wings",
      name: "Chicken Wings",
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1690923888922-f775da8f2346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3MlMjByYXd8ZW58MXx8fHwxNzYxMzc3NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      slug: "chicken-breast",
      name: "Chicken Breast",
      price: 9.99,
      image:
        "https://images.unsplash.com/photo-1700324638718-dade543770fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnJlYXN0JTIwZmlsbGV0fGVufDF8fHx8MTc2MTI3NzI2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 5,
      slug: "chicken-drumsticks",
      name: "Chicken Drumsticks",
      price: 7.99,
      image:
        "https://images.unsplash.com/photo-1690519315565-c31ce99f8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZHJ1bXN0aWNrcyUyMHJhd3xlbnwxfHx8fDE3NjEzNzc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 6,
      slug: "organic-duck",
      name: "Organic Duck",
      price: 18.99,
      image:
        "https://images.unsplash.com/photo-1672787380764-a603a9d4196d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWNrJTIwbWVhdHxlbnwxfHx8fDE3NjEzNzc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 7,
      slug: "premium-turkey",
      name: "Premium Turkey",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1672787380735-2fb682c30b18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJrZXklMjB3aG9sZXxlbnwxfHx8fDE3NjEzNzc3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 8,
      slug: "quail-eggs",
      name: "Quail Eggs",
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1645218167710-356801f89a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFpbCUyMGVnZ3N8ZW58MXx8fHwxNzYxMzc3NzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">Meaty Fresh Products</h2>
          <p className="text-muted-foreground">
            Explore our wide range of premium poultry products
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-lg transition-shadow flex flex-col !p-0 !py-0 !gap-0 rounded-xl"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted rounded-t-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <CardContent className="p-4 text-center flex flex-col flex-1">
                  <h3 className="text-base font-semibold mb-2">
                    {product.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 mt-auto">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
