import type { Metadata } from "next";
import { AdminApplicationsShell } from "@/components/applications";

type Props = { params: Promise<{ reference: string }> };

export function generateStaticParams() { return [{ reference: "__admin-auth-required__" }]; }

export async function generateMetadata({ params }: Props): Promise<Metadata> { const { reference } = await params; return { title: `Application ${reference}` }; }
export default async function AdminApplicationDetailPage({ params }: Props) { const { reference } = await params; return <AdminApplicationsShell reference={reference} />; }
