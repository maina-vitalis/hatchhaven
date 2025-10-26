"use client";

export function Categories() {
  const categories = [
    { icon: "🥚", name: "Fresh Eggs" },
    { icon: "🍗", name: "Chicken" },
    { icon: "🦃", name: "Turkey" },
    { icon: "🦆", name: "Duck" },
    { icon: "🍖", name: "Meat Cuts" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl group-hover:bg-primary transition-colors group-hover:scale-110 transform duration-300">
                {category.icon}
              </div>
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
