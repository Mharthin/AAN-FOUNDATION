import type { Metadata } from "next";
import { SignInShell } from "@/components/applications";

export const metadata: Metadata = { title: "Sign in", description: "Sign in to the AAN Legacy Foundation applicant portal." };

export default function SignInPage() { return <SignInShell />; }
