import type { Metadata } from "next";
import { PeopleApplicationForm } from "@/components/people-applications";

export const metadata: Metadata = { title: "Become a Mentor", description: "Register your interest in mentoring with AAN Legacy Foundation." };
export default function MentorshipPage() { return <PeopleApplicationForm kind="mentor" />; }
