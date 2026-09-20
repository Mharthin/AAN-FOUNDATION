import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireCmsPermission } from "@/lib/security/cms-authorization";

export async function GET() {
  try {
    await requireCmsPermission("dashboard");
    const now = new Date();
    const [scholarshipApplications, pendingApplications, approvedApplications, volunteerApplications, mentorApplications, eventRegistrations, donations, successfulDonations, publishedStories, upcomingEvents] = await Promise.all([
      prisma.scholarshipApplication.count(),
      prisma.scholarshipApplication.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW", "SHORTLISTED"] } } }),
      prisma.scholarshipApplication.count({ where: { status: "APPROVED" } }),
      prisma.volunteerApplication.count(),
      prisma.mentorRegistration.count(),
      prisma.eventRegistration.count(),
      prisma.donation.count(),
      prisma.donation.aggregate({ where: { status: "SUCCESS" }, _sum: { amount: true } }),
      prisma.story.count({ where: { status: "PUBLISHED" } }),
      prisma.event.findMany({ where: { status: "PUBLISHED", startsAt: { gte: now } }, orderBy: { startsAt: "asc" }, take: 5, select: { id: true, title: true, slug: true, startsAt: true, _count: { select: { registrations: true } } } }),
    ]);
    return NextResponse.json({ metrics: { scholarshipApplications, pendingApplications, approvedApplications, volunteerApplications, mentorApplications, eventRegistrations, donations, successfulDonationAmount: successfulDonations._sum.amount ?? 0, publishedStories, upcomingEvents: upcomingEvents.length }, upcomingEvents });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unauthorized" }, { status: 401 });
  }
}
