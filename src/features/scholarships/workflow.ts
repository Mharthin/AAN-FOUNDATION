import { randomUUID } from "node:crypto";
import type { Prisma, ScholarshipApplicationStatus, UserRole } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { assertApplicationAccess, canReviewScholarshipApplications } from "@/lib/security/application-authorization";
import { encryptApplicationResponses } from "@/lib/security/application-encryption";
import { scholarshipApplicationSchema } from "@/lib/validation/scholarship-application";

const transitions: Record<ScholarshipApplicationStatus, ScholarshipApplicationStatus[]> = {
  DRAFT: ["SUBMITTED", "WITHDRAWN"],
  SUBMITTED: ["UNDER_REVIEW", "WITHDRAWN"],
  UNDER_REVIEW: ["SHORTLISTED", "APPROVED", "NOT_APPROVED", "WITHDRAWN"],
  SHORTLISTED: ["APPROVED", "NOT_APPROVED", "WITHDRAWN"],
  APPROVED: [],
  NOT_APPROVED: [],
  WITHDRAWN: [],
};

export async function saveScholarshipApplicationDraft({ applicationId, applicantId, input }: { applicationId?: string; applicantId: string; input: unknown }) {
  const data = scholarshipApplicationSchema.partial().parse(input);
  const encryptedResponses = encryptApplicationResponses(data);
  if (!applicationId) {
    const scholarshipId = zodRequiredString((input as { scholarshipId?: unknown }).scholarshipId, "scholarshipId");
    return prisma.scholarshipApplication.create({
      data: { applicantId, scholarshipId, referenceNumber: `AAN-${randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`, encryptedResponses },
    });
  }
  const existing = await prisma.scholarshipApplication.findUniqueOrThrow({ where: { id: applicationId }, select: { applicantId: true, status: true } });
  assertApplicationAccess({ userId: applicantId, applicantId: existing.applicantId });
  if (existing.status !== "DRAFT") throw new Error("Only draft applications can be edited.");
  return prisma.scholarshipApplication.update({ where: { id: applicationId }, data: { encryptedResponses } });
}

export async function submitScholarshipApplication({ applicationId, applicantId }: { applicationId: string; applicantId: string }) {
  const application = await prisma.scholarshipApplication.findUniqueOrThrow({ where: { id: applicationId }, select: { applicantId: true, status: true } });
  assertApplicationAccess({ userId: applicantId, applicantId: application.applicantId });
  if (application.status !== "DRAFT") throw new Error("Only draft applications can be submitted.");
  return changeScholarshipApplicationStatus({ applicationId, userId: applicantId, role: undefined, toStatus: "SUBMITTED", reason: "Applicant submitted application." });
}

export async function changeScholarshipApplicationStatus({ applicationId, userId, role, toStatus, reason }: { applicationId: string; userId: string; role?: UserRole; toStatus: ScholarshipApplicationStatus; reason?: string }) {
  return prisma.$transaction(async (transaction) => {
    const application = await transaction.scholarshipApplication.findUniqueOrThrow({ where: { id: applicationId }, select: { applicantId: true, status: true, referenceNumber: true } });
    const isApplicantSubmission = toStatus === "SUBMITTED" && !role;
    if (isApplicantSubmission) {
      assertApplicationAccess({ userId, applicantId: application.applicantId });
    } else if (!role || !canReviewScholarshipApplications(role)) {
      throw new Error("Admin authorization required.");
    }
    if (!transitions[application.status].includes(toStatus)) throw new Error(`Invalid status transition from ${application.status} to ${toStatus}.`);
    const updated = await transaction.scholarshipApplication.update({ where: { id: applicationId }, data: { status: toStatus, submittedAt: toStatus === "SUBMITTED" ? new Date() : undefined } });
    await transaction.scholarshipApplicationStatusHistory.create({ data: { applicationId, fromStatus: application.status, toStatus, changedById: userId, reason } });
    await transaction.auditLog.create({ data: { action: "SCHOLARSHIP_APPLICATION_STATUS_CHANGED", entity: "ScholarshipApplication", entityId: applicationId, userId, metadata: { referenceNumber: application.referenceNumber, fromStatus: application.status, toStatus, reason } as Prisma.InputJsonValue } });
    return updated;
  });
}

function zodRequiredString(value: unknown, field: string) {
  if (typeof value !== "string" || value.length === 0) throw new Error(`${field} is required.`);
  return value;
}
