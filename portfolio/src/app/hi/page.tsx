import type { Metadata } from "next";
import { SiteHome } from "@/components/SiteHome";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("hi");

export default function HindiHome() {
  return <SiteHome locale="hi" />;
}
