"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Check, Truck, Shield, Info } from "lucide-react";

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
    <div className="mb-16">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6 mb-8 overflow-x-auto">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-base"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-base"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="shipping"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-base"
          >
            Shipping & Returns
          </TabsTrigger>
          <TabsTrigger
            value="care"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-base"
          >
            Care Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="description"
          className="animate-in fade-in-50 slide-in-from-bottom-2"
        >
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-bold">About {breedName}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {description}
              </p>
              {purpose && (
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h4 className="font-semibold mb-2 text-primary">
                    Ideal Purpose
                  </h4>
                  <p className="text-foreground/80">{purpose}</p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">100% Health Guarantee</span>
                  </div>
                  <div className="flex gap-3">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Expert Support Available</span>
                  </div>
                  <div className="flex gap-3">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Ethically Sourced</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="specifications"
          className="animate-in fade-in-50 slide-in-from-bottom-2"
        >
          <div className="border rounded-xl overflow-hidden">
            <dl className="divide-y">
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30">
                <dt className="font-medium text-muted-foreground">Category</dt>
                <dd className="col-span-2 font-medium">{category}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4">
                <dt className="font-medium text-muted-foreground">Breed</dt>
                <dd className="col-span-2 font-medium">{breedName}</dd>
              </div>
              {origin && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30">
                  <dt className="font-medium text-muted-foreground">Origin</dt>
                  <dd className="col-span-2 font-medium">{origin}</dd>
                </div>
              )}
              {gender && (
                <div className="grid grid-cols-3 gap-4 p-4">
                  <dt className="font-medium text-muted-foreground">
                    Gender/Type
                  </dt>
                  <dd className="col-span-2 font-medium">{gender}</dd>
                </div>
              )}
              {ageGroup && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30">
                  <dt className="font-medium text-muted-foreground">Age/Size</dt>
                  <dd className="col-span-2 font-medium">{ageGroup}</dd>
                </div>
              )}
            </dl>
          </div>
        </TabsContent>

        <TabsContent
          value="shipping"
          className="animate-in fade-in-50 slide-in-from-bottom-2"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" /> Shipping Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We take extra care in packaging to ensure your products arrive
                  safely. Live birds are shipped via specialized carriers with
                  climate control.
                </p>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Orders processed within 24 hours</li>
                  <li>Express delivery available</li>
                  <li>Tracking number provided</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" /> Returns & Guarantee
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your satisfaction is our priority. If you are not completely
                  satisfied with your purchase, please contact us within 24 hours
                  of delivery.
                </p>
                <p className="text-sm font-medium">
                  Live Arrival Guarantee: We guarantee all live birds arrive
                  healthy.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="care"
          className="animate-in fade-in-50 slide-in-from-bottom-2"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Care Instructions</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Immediate Care</h4>
                      <p className="text-sm text-muted-foreground">
                        Upon arrival, ensure access to fresh water and appropriate
                        feed immediately. Keep in a draft-free,
                        temperature-controlled environment.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Long-term Care</h4>
                      <p className="text-sm text-muted-foreground">
                        Maintain clean bedding and fresh water daily. Follow
                        specific breed guidelines for nutrition and housing
                        requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
