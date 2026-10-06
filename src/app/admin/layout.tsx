import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/security/session";

const adminRoles = new Set(["SUPER_ADMIN", "ADMINISTRATOR", "PROGRAM_MANAGER", "COMMUNICATIONS_MANAGER", "FINANCE_MANAGER", "REVIEWER"]);

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user || !adminRoles.has(user.role)) redirect("/admin/sign-in/");
  return children;
}
