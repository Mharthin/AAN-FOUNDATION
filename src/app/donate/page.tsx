import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AboutShell, AboutHero } from "@/components/about";
import { DonationForm } from "@/components/donations";

export const metadata: Metadata = pageMetadata("Donate", "Support AAN Legacy Foundation's work.", "/donate");

export default function DonatePage() {
  return <AboutShell><AboutHero eyebrow="Support the work" title="One gift can widen the circle of opportunity." description="Choose where you would like your contribution to help. Your payment is securely processed by Paystack; AAN never receives or stores card details." /><DonationForm /></AboutShell>;
}
