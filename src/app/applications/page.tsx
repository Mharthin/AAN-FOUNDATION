import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ApplicationStatusShell } from "@/components/applications";
import { getCurrentUser } from "@/lib/security/session";

export const metadata: Metadata = { title: "My applications", description: "Track your AAN Legacy Foundation scholarship applications." };

export default async function ApplicationsPage() {
  if (!(await getCurrentUser())) redirect("/sign-in/");
  return <ApplicationStatusShell />;
}
