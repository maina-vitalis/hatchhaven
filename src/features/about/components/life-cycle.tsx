import Image from "next/image";

interface Stage {
  title: string;
  description: string;
  image: string;
}

export function LifeCycle() {
  const stages: Stage[] = [
    {
      title: "Egg Stage",
      description: "Carefully incubated eggs in optimal conditions",
      image:
        "https://images.unsplash.com/photo-1686215372303-90089a7567db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZWdnJTIwaGF0Y2hpbmd8ZW58MXx8fHwxNzYxMzc3NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Hatchling",
      description: "New chicks receive special care and nutrition",
      image:
        "https://images.unsplash.com/photo-1720508664849-0bd2e5d927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY2hpY2slMjB5ZWxsb3d8ZW58MXx8fHwxNzYxMzc3NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Growing",
      description: "Young chickens raised in free-range environment",
      image:
        "https://images.unsplash.com/photo-1583731456573-3f73c4656924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGNoaWNrZW4lMjBncm93aW5nfGVufDF8fHx8MTc2MTM3NzQ3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Adult Hen",
      description: "Mature chickens producing quality eggs",
      image:
        "https://images.unsplash.com/photo-1581061090142-c2cd0ec9f021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHVsdCUyMGhlbiUyMGNoaWNrZW58ZW58MXx8fHwxNzYxMzc3NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary mb-2">Understanding Our Process</p>
          <h2 className="text-4xl md:text-5xl mb-4">Chicken Life Cycle</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From egg to adult, we carefully oversee every stage of development
            to ensure the health and well-being of our poultry
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stages.map((stage, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary shadow-lg">
                  <Image
                    src={stage.image}
                    alt={stage.title}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                {index < stages.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30 transform -translate-y-1/2" />
                )}
              </div>
              <h3 className="mb-2">{stage.title}</h3>
              <p className="text-sm text-muted-foreground">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
