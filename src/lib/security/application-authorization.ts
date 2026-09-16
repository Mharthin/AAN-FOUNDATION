import type { UserRole } from "@prisma/client";

const adminRoles: UserRole[] = ["SUPER_ADMIN", "ADMINISTRATOR", "PROGRAM_MANAGER", "REVIEWER"];

export function assertAuthenticated(userId: string | null | undefined): asserts userId is string {
  if (!userId) throw new Error("Authentication required.");
}

export function canReviewScholarshipApplications(role: UserRole) {
  return adminRoles.includes(role);
}

export function assertApplicationAccess({ userId, applicantId, role }: { userId: string; applicantId: string; role?: UserRole }) {
  if (userId !== applicantId && (!role || !canReviewScholarshipApplications(role))) {
    throw new Error("You are not authorized to access this application.");
  }
}
