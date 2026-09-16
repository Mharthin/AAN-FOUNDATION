import type { Metadata } from "next";
import { SignInShell } from "@/components/applications";

export const metadata: Metadata = { title: "Create account", description: "Create an AAN Legacy Foundation applicant account." };

export default function CreateAccountPage() { return <SignInShell createAccount />; }
