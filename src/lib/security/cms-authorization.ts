import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/security/session";

const adminRoles = new Set(["SUPER_ADMIN", "ADMINISTRATOR", "COMMUNICATIONS_MANAGER"]);
const permissions = {
  dashboard: new Set(["SUPER_ADMIN", "ADMINISTRATOR", "PROGRAM_MANAGER", "COMMUNICATIONS_MANAGER", "FINANCE_MANAGER", "REVIEWER"]),
  events: new Set(["SUPER_ADMIN", "ADMINISTRATOR", "PROGRAM_MANAGER"]),
  donations: new Set(["SUPER_ADMIN", "ADMINISTRATOR", "FINANCE_MANAGER"]),
  stories: new Set(["SUPER_ADMIN", "ADMINISTRATOR", "COMMUNICATIONS_MANAGER"]),
} as const;
const cmsRoles = new Set(["SUPER_ADMIN", "ADMINISTRATOR", "PROGRAM_MANAGER", "COMMUNICATIONS_MANAGER", "FINANCE_MANAGER", "REVIEWER"]);

export async function requireCmsAdmin() {
  const user = await getCurrentUser();
  if (user && user.isActive && cmsRoles.has(user.role)) return { role: user.role };
  throw new Error("CMS administrator authentication required.");
}

export async function requireCmsPermission(permission: keyof typeof permissions) {
  const admin = await requireCmsAdmin();
  if (!permissions[permission].has(admin.role)) throw new Error(`You do not have permission to manage ${permission}.`);
  return admin;
}

export async function canManageStories(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true, isActive: true } });
  return Boolean(user?.isActive && adminRoles.has(user.role));
}
