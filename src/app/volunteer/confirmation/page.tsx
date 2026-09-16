import type { Metadata } from "next";
import { PeopleConfirmation } from "@/components/people-applications";

export const metadata: Metadata = { title: "Volunteer confirmation", description: "Volunteer registration confirmation." };
export default function VolunteerConfirmationPage() { return <PeopleConfirmation kind="volunteer" />; }
