import {
  BlogSingleHero,
  BlogSingleContent,
  BlogSingleSidebar,
} from "@/src/features/blog";
import { Footer } from "@/src/features/shared";

export default function BlogSinglePage() {
  return (
    <>
      <BlogSingleHero />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <BlogSingleContent />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSingleSidebar />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
