import type { Metadata } from "next";
import { AboutShell, AboutHero } from "@/components/about";
import { DonationForm } from "@/components/donations";

export const metadata: Metadata = { title: "Donate", description: "Support AAN Legacy Foundation's work." };

export default function DonatePage() {
  return <AboutShell><AboutHero eyebrow="Support the work" title="One gift can widen the circle of opportunity." description="Choose where you would like your contribution to help. Your payment is securely processed by Paystack; AAN never receives or stores card details." /><DonationForm /></AboutShell>;
}
