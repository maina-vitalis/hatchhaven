"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProductCategories() {
  const products = [
    {
      name: "Chickens",
      image:
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=300&h=200&fit=crop&crop=center",
      price: "From $12.99",
      description: "Free-range chickens",
    },
    {
      name: "Turkeys",
      image:
        "https://images.unsplash.com/photo-1574781330855-d0db2706b3d0?w=300&h=200&fit=crop&crop=center",
      price: "From $24.99",
      description: "Premium turkeys",
    },
    {
      name: "Ducks",
      image:
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop&crop=center",
      price: "From $18.99",
      description: "Fresh ducks",
    },
    {
      name: "Eggs",
      image:
        "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=200&fit=crop&crop=center",
      price: "From $4.99",
      description: "Farm fresh eggs",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our wide selection of fresh, high-quality poultry
            products
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-orange-500">
                    Fresh
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-500 font-bold">
                      {product.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      View Products
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
