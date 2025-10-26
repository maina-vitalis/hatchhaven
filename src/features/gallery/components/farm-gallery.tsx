import Image from "next/image";

export function FarmGallery() {
  const images = [
    "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1574781330855-d0db2706b3d0?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1574781330855-d0db2706b3d0?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop&crop=center",
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Farm</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a look at our farm and see how we raise our poultry with care
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group"
            >
              <Image
                src={image}
                alt={`Farm image ${index + 1}`}
                width={300}
                height={300}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
