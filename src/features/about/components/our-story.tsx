import Image from "next/image";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function OurStory() {
  const values = [
    "Sustainable and ethical farming practices",
    "Highest quality standards and certifications",
    "Community-focused approach and local partnerships",
    "Innovation in agriculture and technology",
  ];

  const milestones = [
    { year: "2000", title: "Founded", description: "Started as a small family farm with a vision for ethical poultry farming" },
    { year: "2010", title: "Expansion", description: "Expanded operations and earned organic certification" },
    { year: "2018", title: "Recognition", description: "Awarded Best Poultry Farm in the region" },
    { year: "2024", title: "Innovation", description: "Implemented advanced sustainable farming technologies" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
              Our Journey
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Our Story: From Family Farm to Community Leader
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-base md:text-lg">
                What started as a small family farm in 2000 has grown into one of
                the region's most trusted sources for fresh, ethically-raised
                poultry and eggs. Our commitment to quality and sustainability has
                never wavered, even as we've expanded our operations.
              </p>
              <p className="text-base md:text-lg">
                Today, we continue to honor our roots while embracing modern
                farming techniques that prioritize animal welfare, environmental
                stewardship, and community well-being. Every decision we make is
                guided by our core values of integrity, quality, and respect for
                nature.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground text-base leading-relaxed">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1701124163686-5b6024559082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYmFybiUyMGNvdW50cnlzaWRlfGVufDF8fHx8MTc2MTM3NjgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Hatch Haven Farm"
                width={600}
                height={450}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="border-t pt-20">
          <div className="text-center mb-12">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
              Our Milestones
            </p>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Key Moments in Our Journey
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="text-primary text-3xl font-bold mb-2">
                    {milestone.year}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{milestone.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
