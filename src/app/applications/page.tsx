import type { Metadata } from "next";
import { ApplicationStatusShell } from "@/components/applications";

export const metadata: Metadata = { title: "My applications", description: "Track your AAN Legacy Foundation scholarship applications." };

export default function ApplicationsPage() { return <ApplicationStatusShell />; }
