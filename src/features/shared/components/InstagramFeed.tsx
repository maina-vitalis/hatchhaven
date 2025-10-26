import Image from "next/image";

export function InstagramFeed() {
  const images = [
    "https://images.unsplash.com/photo-1634864418654-f0c877ad7897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwY2hpY2tlbiUyMGRpbm5lcnxlbnwxfHx8fDE3NjEzNzY4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1618496899001-b58ebcbeef26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhcm1lciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MTMwNjk0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1627462656780-964d9535a50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBjaGlja2VucyUyMGZhcm18ZW58MXx8fHwxNzYxMzc2ODE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1664339307400-9c22e5f44496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGVnZ3MlMjBiYXNrZXR8ZW58MXx8fHwxNzYxMzE2MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1701124163686-5b6024559082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYmFybiUyMGNvdW50cnlzaWRlfGVufDF8fHx8MTc2MTM3NjgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1669669420347-1f3cdb1c3958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY2hpY2tlbiUyMGZhcm18ZW58MXx8fHwxNzYxMzc2ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  return (
    <div>
      <h3 className="mb-6">Instagram Feed</h3>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <a
            key={index}
            href="#"
            className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
          >
            <Image
              src={image}
              alt={`Instagram post ${index + 1}`}
              width={100}
              height={100}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              unoptimized
            />
          </a>
        ))}
      </div>
    </div>
  );
}
