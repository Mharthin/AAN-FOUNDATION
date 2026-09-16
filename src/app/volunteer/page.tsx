import type { Metadata } from "next";
import { PeopleApplicationForm } from "@/components/people-applications";

export const metadata: Metadata = { title: "Volunteer", description: "Register your interest in volunteering with AAN Legacy Foundation." };
export default function VolunteerPage() { return <PeopleApplicationForm kind="volunteer" />; }
