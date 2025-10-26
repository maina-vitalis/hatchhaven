"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093707!2d144.9537353159042!3d-37.81720974201446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1234567890123!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Farm Location"
            />
          </div>

          {/* Form */}
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name*</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject*</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Subject"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message*</Label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  className="mt-2 min-h-[150px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
              >
                Submit Now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
