import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

export function Products() {
  const products: Product[] = [
    {
      id: 1,
      name: "Fresh Brown Eggs",
      price: "$6.99",
      category: "Eggs",
      image:
        "https://images.unsplash.com/photo-1664339307400-9c22e5f44496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGVnZ3MlMjBiYXNrZXR8ZW58MXx8fHwxNzYxMzE2MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Organic Whole Chicken",
      price: "$12.99",
      category: "Poultry",
      image:
        "https://images.unsplash.com/photo-1629966207968-16b1027bed09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbWVhdCUyMGN1dHN8ZW58MXx8fHwxNzYxMzc2ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      name: "Free-Range Chicken Breast",
      price: "$9.99",
      category: "Poultry",
      image:
        "https://images.unsplash.com/photo-1629966207968-16b1027bed09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbWVhdCUyMGN1dHN8ZW58MXx8fHwxNzYxMzc2ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      name: "Farm Fresh Eggs (White)",
      price: "$5.99",
      category: "Eggs",
      image:
        "https://images.unsplash.com/photo-1670702735399-a9a4f61c0d46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGVnZ3MlMjBuZXN0fGVufDF8fHx8MTc2MTM3NjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 5,
      name: "Premium Turkey",
      price: "$24.99",
      category: "Poultry",
      image:
        "https://images.unsplash.com/photo-1634864418654-f0c877ad7897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwY2hpY2tlbiUyMGRpbm5lcnxlbnwxfHx8fDE3NjEzNzY4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 6,
      name: "Chicken Drumsticks",
      price: "$7.99",
      category: "Poultry",
      image:
        "https://images.unsplash.com/photo-1629966207968-16b1027bed09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbWVhdCUyMGN1dHN8ZW58MXx8fHwxNzYxMzc2ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 7,
      name: "Organic Duck",
      price: "$18.99",
      category: "Poultry",
      image:
        "https://images.unsplash.com/photo-1634864418654-f0c877ad7897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwY2hpY2tlbiUyMGRpbm5lcnxlbnwxfHx8fDE3NjEzNzY4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 8,
      name: "Chicken Wings",
      price: "$8.99",
      category: "Poultry",
      image:
        "https://images.unsplash.com/photo-1629966207968-16b1027bed09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbWVhdCUyMGN1dHN8ZW58MXx8fHwxNzYxMzc2ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our selection of premium, farm-fresh poultry and eggs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-lg transition-shadow flex flex-col p-0 py-0 gap-0 rounded-xl"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative aspect-4/3 w-full overflow-hidden bg-muted rounded-t-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>

                <CardContent className="p-4 px-4 flex flex-col flex-1">
                  <span className="text-xs font-medium text-primary mb-1 uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h3 className="text-base font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-3 border-t">
                    <span className="text-lg font-bold">{product.price}</span>
                    <Button
                      size="sm"
                      className="h-8 w-8 rounded-full p-0"
                      aria-label={`View ${product.name} details`}
                      asChild
                    >
                      <Link href={`/products/${product.id}`}>
                        <ShoppingCart className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="px-8" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
