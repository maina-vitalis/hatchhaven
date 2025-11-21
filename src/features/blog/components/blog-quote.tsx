import { Quote } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";

export function BlogQuote() {
  return (
    <Card className="bg-primary/5 border-l-4 border-primary">
      <CardContent className="p-8">
        <div className="flex gap-4">
          <Quote className="h-8 w-8 text-primary shrink-0" />
          <div>
            <p className="text-foreground italic mb-4 leading-relaxed">
              Competently utilize equity invested web-readiness whereas
              distinctive outsourcing. Interactively coordinate proactive
              e-commerce via process-centric "outside the box" thinking.
              Completely pursue sustainable methods of empowerment. Quickly
              morph principle-centered web services, whereas seamlessly supply.
            </p>
            <p className="text-primary">- Jason Smith</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
