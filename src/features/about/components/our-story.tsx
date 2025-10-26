import Image from "next/image";
import { Check } from "lucide-react";

export function OurStory() {
  const values = [
    "Sustainable and ethical farming",
    "Highest quality standards",
    "Community focused approach",
    "Innovation in agriculture",
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-primary mb-2">Our Journey</p>
            <h2 className="text-4xl md:text-5xl mb-6">
              Our Story: From Family Farm to Community Leader
            </h2>
            <p className="text-muted-foreground mb-6">
              What started as a small family farm in 2000 has grown into one of
              the region's most trusted sources for fresh, ethically-raised
              poultry and eggs. Our commitment to quality and sustainability has
              never wavered.
            </p>
            <p className="text-muted-foreground mb-8">
              Today, we continue to honor our roots while embracing modern
              farming techniques that prioritize animal welfare, environmental
              stewardship, and community well-being.
            </p>

            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1701124163686-5b6024559082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYmFybiUyMGNvdW50cnlzaWRlfGVufDF8fHx8MTc2MTM3NjgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our farm"
                width={600}
                height={450}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
