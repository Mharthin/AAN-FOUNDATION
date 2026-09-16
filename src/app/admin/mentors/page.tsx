import type { Metadata } from "next";
import { PeopleAdminShell } from "@/components/people-applications";

export const metadata: Metadata = { title: "Admin mentors", description: "Review mentor registrations." };
export default function AdminMentorsPage() { return <PeopleAdminShell kind="mentor" />; }
