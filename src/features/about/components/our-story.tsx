import Image from "next/image";
import { Check, Sparkles, TrendingUp, Award, Zap } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

export function OurStory() {
  const values = [
    {
      icon: Check,
      text: "Sustainable and ethical farming practices"
    },
    {
      icon: Check,
      text: "Highest quality standards and certifications"
    },
    {
      icon: Check,
      text: "Community-focused approach and local partnerships"
    },
    {
      icon: Check,
      text: "Innovation in agriculture and technology"
    },
  ];

  const milestones = [
    {
      year: "2000",
      title: "Founded",
      icon: Sparkles,
      description: "Started as a small family farm with a vision for ethical poultry farming",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      year: "2010",
      title: "Expansion",
      icon: TrendingUp,
      description: "Expanded operations and earned organic certification",
      color: "bg-green-500/10 text-green-600"
    },
    {
      year: "2018",
      title: "Recognition",
      icon: Award,
      description: "Awarded Best Poultry Farm in the region",
      color: "bg-yellow-500/10 text-yellow-600"
    },
    {
      year: "2024",
      title: "Innovation",
      icon: Zap,
      description: "Implemented advanced sustainable farming technologies",
      color: "bg-purple-500/10 text-purple-600"
    },
  ];

  return (
    <section id="our-story" className="py-20 bg-muted/30">

      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <Badge variant="secondary" className="mb-4">
                Our Journey
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                From Family Farm to{" "}
                <span className="text-primary">Community Leader</span>
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                What started as a small family farm in 2000 has grown into one of the region's most trusted sources for fresh, ethically-raised poultry and eggs. Our commitment to quality and sustainability has never wavered, even as we've expanded our operations.
              </p>
              <p className="text-lg">
                Today, we continue to honor our roots while embracing modern farming techniques that prioritize animal welfare, environmental stewardship, and community well-being.
              </p>
            </div>

            <div className="space-y-3">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <value.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground leading-relaxed">
                    {value.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1701124163686-5b6024559082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYmFybiUyMGNvdW50cnlzaWRlfGVufDF8fHx8MTc2MTM3NjgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Hatch Haven Farm"
                width={600}
                height={450}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="border-t border-border pt-16">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Milestones
            </Badge>
            <h3 className="text-3xl font-bold mb-4">
              Key Moments in Our Journey
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each milestone represents our commitment to growth, innovation, and excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <milestone.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold mb-2 text-foreground">
                    {milestone.year}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
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
