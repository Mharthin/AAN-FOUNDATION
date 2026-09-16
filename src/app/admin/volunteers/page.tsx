import type { Metadata } from "next";
import { PeopleAdminShell } from "@/components/people-applications";

export const metadata: Metadata = { title: "Admin volunteers", description: "Review volunteer applications." };
export default function AdminVolunteersPage() { return <PeopleAdminShell kind="volunteer" />; }
