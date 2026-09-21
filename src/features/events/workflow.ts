import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { eventRegistrationSchema } from "@/lib/validation/event";

export async function registerForEvent(eventId: string, input: unknown) {
  const data = eventRegistrationSchema.parse(input);
  const event = await prisma.event.findFirst({
    where: { id: eventId, status: "PUBLISHED" },
    select: { id: true, capacity: true, registrationDeadline: true, startsAt: true },
  });
  if (!event) throw new Error("Event is not available for registration.");
  if (event.registrationDeadline && event.registrationDeadline < new Date()) throw new Error("Registration for this event has closed.");
  if (event.startsAt < new Date()) throw new Error("This event has already started.");

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await prisma.$transaction(async (transaction) => {
        const registrationCount = await transaction.eventRegistration.count({ where: { eventId } });
        if (event.capacity !== null && registrationCount >= event.capacity) throw new Error("This event is at capacity.");
        return transaction.eventRegistration.create({
          data: { eventId, fullName: data.fullName, email: data.email.toLowerCase(), phone: data.phone || null, notes: data.notes || null },
        });
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== "P2034" || attempt === 2) throw error;
    }
  }
  throw new Error("Unable to complete event registration.");
}
