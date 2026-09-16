import { randomUUID } from "node:crypto";
import type { PeopleApplicationStatus, Prisma, UserRole } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { encryptApplicationResponses } from "@/lib/security/application-encryption";
import { canReviewScholarshipApplications } from "@/lib/security/application-authorization";
import { mentorRegistrationSchema, volunteerApplicationSchema, type MentorRegistrationInput, type VolunteerApplicationInput } from "@/lib/validation/people-applications";

const transitions: Record<PeopleApplicationStatus, PeopleApplicationStatus[]> = {
  SUBMITTED: ["UNDER_REVIEW", "APPROVED", "REJECTED", "WITHDRAWN"],
  UNDER_REVIEW: ["APPROVED", "REJECTED", "WITHDRAWN"],
  APPROVED: [],
  REJECTED: [],
  WITHDRAWN: [],
};

export async function submitVolunteerApplication(input: unknown, applicantId?: string) {
  const data = volunteerApplicationSchema.parse(input) as VolunteerApplicationInput;
  const referenceNumber = `AAN-V-${randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`;
  return prisma.volunteerApplication.create({ data: { ...data, referenceNumber, encryptedPayload: encryptApplicationResponses(data), applicantId } });
}

export async function submitMentorRegistration(input: unknown, applicantId?: string) {
  const data = mentorRegistrationSchema.parse(input) as MentorRegistrationInput;
  const referenceNumber = `AAN-M-${randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`;
  return prisma.mentorRegistration.create({ data: { ...data, referenceNumber, encryptedPayload: encryptApplicationResponses(data), applicantId } });
}

export async function changePeopleApplicationStatus({ kind, id, userId, role, toStatus, reason }: { kind: "volunteer" | "mentor"; id: string; userId: string; role: UserRole; toStatus: PeopleApplicationStatus; reason?: string }) {
  if (!canReviewScholarshipApplications(role)) throw new Error("Admin authorization required.");
  return prisma.$transaction(async (transaction) => {
    const application = kind === "volunteer"
      ? await transaction.volunteerApplication.findUniqueOrThrow({ where: { id }, select: { status: true, referenceNumber: true } })
      : await transaction.mentorRegistration.findUniqueOrThrow({ where: { id }, select: { status: true, referenceNumber: true } });
    if (!transitions[application.status].includes(toStatus)) throw new Error(`Invalid status transition from ${application.status} to ${toStatus}.`);
    const updated = kind === "volunteer"
      ? await transaction.volunteerApplication.update({ where: { id }, data: { status: toStatus } })
      : await transaction.mentorRegistration.update({ where: { id }, data: { status: toStatus } });
    await transaction.peopleApplicationStatusHistory.create({ data: { [kind === "volunteer" ? "volunteerId" : "mentorId"]: id, fromStatus: application.status, toStatus, changedById: userId, reason } });
    await transaction.auditLog.create({ data: { action: `${kind.toUpperCase()}_APPLICATION_STATUS_CHANGED`, entity: kind === "volunteer" ? "VolunteerApplication" : "MentorRegistration", entityId: id, userId, metadata: { referenceNumber: application.referenceNumber, fromStatus: application.status, toStatus, reason } as Prisma.InputJsonValue } });
    return updated;
  });
}
