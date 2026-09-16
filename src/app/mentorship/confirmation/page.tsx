import type { Metadata } from "next";
import { PeopleConfirmation } from "@/components/people-applications";

export const metadata: Metadata = { title: "Mentor confirmation", description: "Mentor registration confirmation." };
export default function MentorshipConfirmationPage() { return <PeopleConfirmation kind="mentor" />; }
