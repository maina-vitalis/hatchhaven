import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ProductGallery() {
  const images = [
    "https://images.unsplash.com/photo-1627462656780-964d9535a50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2VucyUyMGZhcm18ZW58MXx8fHwxNzYxMzc2ODE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1664339307400-9c22e5f44496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGVnZ3MlMjBiYXNrZXR8ZW58MXx8fHwxNzYxMzE2MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1669669420347-1f3cdb1c3958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY2hpY2tlbiUyMGZhcm18ZW58MXx8fHwxNzYxMzc2ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1634864418654-f0c877ad7897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwY2hpY2tlbiUyMGRpbm5lcnxlbnwxfHx8fDE3NjEzNzY4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1672787153655-0c19308dcc60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aG9sZSUyMGNoaWNrZW4lMjByYXd8ZW58MXx8fHwxNzYxMzc3NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1690923888922-f775da8f2346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3MlMjByYXd8ZW58MXx8fHwxNzYxMzc3NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1701124163686-5b6024559082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYmFybiUyMGNvdW50cnlzaWRlfGVufDF8fHx8MTc2MTM3NjgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1670702735399-a9a4f61c0d46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGVnZ3MlMjBuZXN0fGVufDF8fHx8MTc2MTM3NjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">Our Fresh Gallery</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <Image
                src={image}
                alt={`Gallery ${index + 1}`}
                width={300}
                height={300}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                unoptimized
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-primary hover:bg-primary/90">View More</Button>
        </div>
      </div>
    </section>
  );
}
