import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FeaturedProducts() {
  const featured = [
    {
      title: "Fresh Whole Chicken",
      image:
        "https://images.unsplash.com/photo-1672787153655-0c19308dcc60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aG9sZSUyMGNoaWNrZW4lMjByYXd8ZW58MXx8fHwxNzYxMzc3NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Farm Fresh Eggs",
      image:
        "https://images.unsplash.com/photo-1585355611444-06154f329e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZWdncyUyMGNhcnRvbnxlbnwxfHx8fDE3NjEzNzc3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Chicken Wings",
      image:
        "https://images.unsplash.com/photo-1690923888922-f775da8f2346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3MlMjByYXd8ZW58MXx8fHwxNzYxMzc3NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Premium Chicken Breast",
      image:
        "https://images.unsplash.com/photo-1700324638718-dade543770fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnJlYXN0JTIwZmlsbGV0fGVufDF8fHx8MTc2MTI3NzI2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl mb-4">
              Welcome to Our Mega Agg Farm
            </h2>
          </div>
          <div className="text-muted-foreground">
            <p className="mb-4">
              At Mega Farm, we take pride in delivering the freshest,
              highest-quality poultry products. Our commitment to ethical
              farming ensures every product meets exceptional standards.
            </p>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/about">Read More</Link>
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
              <CardContent className="p-4 text-center bg-background">
                <h3 className="text-sm">{product.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
