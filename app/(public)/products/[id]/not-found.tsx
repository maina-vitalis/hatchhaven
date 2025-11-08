import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/src/features/shared";

export default function NotFound() {
  return (
    <>
      <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link href="/products">Return to Products</Link>
        </Button>
      </div>
      <Footer />
    </>
  );
}

