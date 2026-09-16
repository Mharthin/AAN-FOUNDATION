import type { Metadata } from "next";
import { AdminApplicationsShell } from "@/components/applications";

export const metadata: Metadata = { title: "Admin applications", description: "Review AAN Legacy Foundation scholarship applications." };

export default function AdminApplicationsPage() { return <AdminApplicationsShell />; }
