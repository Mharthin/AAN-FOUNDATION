import { prisma } from "@/lib/db/prisma";
import { createSession } from "@/lib/security/session";
import { hashPassword, verifyPassword } from "@/lib/security/passwords";
import { signInSchema, signUpSchema } from "@/lib/validation/auth";

export async function registerUser(input: unknown) {
  const data = signUpSchema.parse(input);
  const email = data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) throw new Error("An account with that email already exists.");
  const user = await prisma.user.create({ data: { name: data.name, email, passwordHash: await hashPassword(data.password), role: "REVIEWER" }, select: { id: true, name: true, email: true, role: true } });
  await createSession(user.id);
  return user;
}

export async function authenticateUser(input: unknown) {
  const data = signInSchema.parse(input);
  const user = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
  if (!user?.isActive || !user.passwordHash || !(await verifyPassword(data.password, user.passwordHash))) throw new Error("Invalid email or password.");
  await createSession(user.id);
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
