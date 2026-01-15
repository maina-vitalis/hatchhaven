"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Card, CardContent } from "@/src/components/ui/card";
import { Truck, ShieldCheck, Info, Leaf } from "lucide-react";

interface ProductTabsProps {
  description: string;
  purpose?: string;
  category: string;
  breedName: string;
  origin?: string;
  gender?: string;
  ageGroup?: string;
}

export function ProductTabs({
  description,
  purpose,
  category,
  breedName,
  origin,
  gender,
  ageGroup,
}: ProductTabsProps) {
  return (
    <div className="w-full">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start border-b h-auto p-0 bg-transparent space-x-8 mb-8 overflow-x-auto no-scrollbar">
          {["Description", "Specifications", "Shipping", "Care Guide"].map(
            (tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase().split(" ")[0]}
                className="rounded-md border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none px-1 py-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {tab}
              </TabsTrigger>
            )
          )}
        </TabsList>

        <TabsContent
          value="description"
          className="space-y-8 animate-in fade-in-50"
        >
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold mb-4">About {breedName}</h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          {purpose && (
            <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl">
              <Leaf className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Ideal Purpose</h4>
                <p className="text-muted-foreground">{purpose}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="specifications" className="animate-in fade-in-50">
          <div className="rounded-2xl border overflow-hidden">
            <dl className="divide-y">
              {[
                { label: "Category", value: category },
                { label: "Breed", value: breedName },
                { label: "Origin", value: origin },
                { label: "Gender", value: gender },
                { label: "Age Group", value: ageGroup },
              ].map(
                (item, i) =>
                  item.value && (
                    <div
                      key={item.label}
                      className={`grid grid-cols-3 gap-4 p-4 ${
                        i % 2 === 0 ? "bg-muted/30" : "bg-transparent"
                      }`}
                    >
                      <dt className="font-medium text-muted-foreground">
                        {item.label}
                      </dt>
                      <dd className="col-span-2 font-medium text-foreground">
                        {item.value}
                      </dd>
                    </div>
                  )
              )}
            </dl>
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="animate-in fade-in-50">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-background rounded-lg shadow-sm">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    Shipping Information
                  </h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Orders processed within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>
                      Specialized climate-controlled transport for live birds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Nationwide delivery network</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-background rounded-lg shadow-sm">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Our Guarantee</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  We stand by the quality of our poultry.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  100% Live Arrival Guarantee
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="care" className="animate-in fade-in-50">
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-2xl p-6 lg:p-8">
            <div className="flex gap-4">
              <Info className="h-6 w-6 text-amber-600 shrink-0" />
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100">
                  Care Guide
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                      Immediate Arrival
                    </h4>
                    <p className="text-amber-700/80 dark:text-amber-300/80 text-sm leading-relaxed">
                      Ensure access to fresh water and appropriate feed
                      immediately. Keep in a draft-free, temperature-controlled
                      environment for the first 48 hours.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                      Ongoing Maintenance
                    </h4>
                    <p className="text-amber-700/80 dark:text-amber-300/80 text-sm leading-relaxed">
                      Maintain clean bedding daily. Follow specific breed
                      guidelines for nutrition requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
