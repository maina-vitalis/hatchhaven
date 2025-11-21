import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hatch Haven - Fresh & Ethical Poultry",
  description: "Premium quality poultry including chickens, turkeys, ducks and fresh eggs",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

