import { ProductDetails } from "@/src/features/products/components/product-details";
import { Footer } from "@/src/features/shared";

// Mock data - In a real app, this would come from an API or database
function getProductData(id: string) {
  // This is mock data based on the schema structure
  // In production, you'd fetch from Prisma/database
  const mockProducts: Record<
    string,
    {
      id: string;
      name: string;
      category: string;
      breed: {
        name: string;
        description: string;
        origin?: string;
        purpose?: string;
        image?: string;
      };
      variants: Array<{
        id: string;
        gender: string;
        ageGroup: string;
        price: number;
        stock: number;
        image?: string;
      }>;
      images?: string[];
    }
  > = {
    "1": {
      id: "1",
      name: "Fresh Brown Eggs",
      category: "Eggs",
      breed: {
        name: "Rhode Island Red",
        description:
          "Premium free-range brown eggs from our happy, healthy hens. These eggs are laid daily by our Rhode Island Red chickens, which are known for their excellent egg-laying capabilities and rich, flavorful eggs. Our hens are raised on organic feed and have access to open pastures, ensuring the highest quality eggs.",
        origin: "United States",
        purpose: "Eggs",
        image:
          "https://images.unsplash.com/photo-1664339307400-9c22e5f44496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGVnZ3MlMjBiYXNrZXR8ZW58MXx8fHwxNzYxMzE2MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      variants: [
        {
          id: "v1",
          gender: "Female",
          ageGroup: "Mature",
          price: 6.99,
          stock: 45,
          image:
            "https://images.unsplash.com/photo-1664339307400-9c22e5f44496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGVnZ3MlMjBiYXNrZXR8ZW58MXx8fHwxNzYxMzE2MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        },
        {
          id: "v2",
          gender: "Female",
          ageGroup: "1-7 months",
          price: 5.99,
          stock: 30,
        },
      ],
      images: [
        "https://images.unsplash.com/photo-1664339307400-9c22e5f44496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGVnZ3MlMjBiYXNrZXR8ZW58MXx8fHwxNzYxMzE2MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1670702735399-a9a4f61c0d46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGVnZ3MlMjBuZXN0fGVufDF8fHx8MTc2MTM3NjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1585355611444-06154f329e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZWdncyUyMGNhcnRvbnxlbnwxfHx8fDE3NjEzNzc3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
    },
    "2": {
      id: "2",
      name: "Organic Whole Chicken",
      category: "Poultry",
      breed: {
        name: "Cornish Cross",
        description:
          "Premium organic whole chicken raised on our free-range farm. Our Cornish Cross chickens are raised without hormones or antibiotics, fed organic feed, and given plenty of space to roam. The result is tender, flavorful meat that's perfect for roasting, grilling, or any of your favorite recipes.",
        origin: "United States",
        purpose: "Meat",
        image:
          "https://images.unsplash.com/photo-1629966207968-16b1027bed09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbWVhdCUyMGN1dHN8ZW58MXx8fHwxNzYxMzc2ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      variants: [
        {
          id: "v3",
          gender: "Pair",
          ageGroup: "Mature",
          price: 12.99,
          stock: 25,
          image:
            "https://images.unsplash.com/photo-1629966207968-16b1027bed09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbWVhdCUyMGN1dHN8ZW58MXx8fHwxNzYxMzc2ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        },
        {
          id: "v4",
          gender: "Male",
          ageGroup: "Mature",
          price: 11.99,
          stock: 15,
        },
        {
          id: "v5",
          gender: "Female",
          ageGroup: "Mature",
          price: 13.99,
          stock: 20,
        },
      ],
      images: [
        "https://images.unsplash.com/photo-1629966207968-16b1027bed09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbWVhdCUyMGN1dHN8ZW58MXx8fHwxNzYxMzc2ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1672787153655-0c19308dcc60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aG9sZSUyMGNoaWNrZW4lMjByYXd8ZW58MXx8fHwxNzYxMzc3NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
    },
    "3": {
      id: "3",
      name: "Free-Range Chicken Breast",
      category: "Poultry",
      breed: {
        name: "Cornish Cross",
        description:
          "Tender, boneless chicken breast from our free-range chickens. Perfect for quick weeknight meals, these breasts are naturally raised without antibiotics or hormones. Each breast is carefully trimmed and ready to cook.",
        origin: "United States",
        purpose: "Meat",
        image:
          "https://images.unsplash.com/photo-1700324638718-dade543770fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnJlYXN0JTIwZmlsbGV0fGVufDF8fHx8MTc2MTI3NzI2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      variants: [
        {
          id: "v6",
          gender: "Pair",
          ageGroup: "Mature",
          price: 9.99,
          stock: 35,
          image:
            "https://images.unsplash.com/photo-1700324638718-dade543770fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnJlYXN0JTIwZmlsbGV0fGVufDF8fHx8MTc2MTI3NzI2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        },
      ],
    },
  };

  return mockProducts[id] || null;
}

function getRelatedProducts(currentId: string) {
  // Mock related products
  return [
    {
      id: "4",
      name: "Farm Fresh Eggs (White)",
      price: 5.99,
      image:
        "https://images.unsplash.com/photo-1670702735399-a9a4f61c0d46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGVnZ3MlMjBuZXN0fGVufDF8fHx8MTc2MTM3NjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Eggs",
    },
    {
      id: "5",
      name: "Premium Turkey",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1634864418654-f0c877ad7897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwY2hpY2tlbiUyMGRpbm5lcnxlbnwxfHx8fDE3NjEzNzY4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Poultry",
    },
    {
      id: "6",
      name: "Chicken Drumsticks",
      price: 7.99,
      image:
        "https://images.unsplash.com/photo-1629966207968-16b1027bed09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbWVhdCUyMGN1dHN8ZW58MXx8fHwxNzYxMzc2ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Poultry",
    },
    {
      id: "7",
      name: "Organic Duck",
      price: 18.99,
      image:
        "https://images.unsplash.com/photo-1634864418654-f0c877ad7897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwY2hpY2tlbiUyMGRpbm5lcnxlbnwxfHx8fDE3NjEzNzY4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Poultry",
    },
  ].filter((p) => p.id !== currentId);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductData(id);
  const relatedProducts = getRelatedProducts(id);

  if (!product) {
    return (
      <>
        <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <a
            href="/products"
            className="text-primary hover:underline"
          >
            Return to Products
          </a>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ProductDetails product={product} relatedProducts={relatedProducts} />
      <Footer />
    </>
  );
}

