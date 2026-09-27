import type { Metadata } from "next";
import { SiteHome } from "@/components/SiteHome";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("en");

export default function Home() {
  return <SiteHome locale="en" />;
}
