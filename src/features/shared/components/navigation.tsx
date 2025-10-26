import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=40&h=40&fit=crop&crop=center"
            alt="Fresh Poultry Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-gray-800">Fresh Poultry</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-700 hover:text-orange-500">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-orange-500">
            Products
          </a>
          <a href="#" className="text-gray-700 hover:text-orange-500">
            About
          </a>
          <a href="#" className="text-gray-700 hover:text-orange-500">
            Contact
          </a>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">Shop Now</Button>
      </div>
    </nav>
  );
}
