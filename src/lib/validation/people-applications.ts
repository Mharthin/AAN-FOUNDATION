import { z } from "zod";

const text = (max: number) => z.string().trim().min(1).max(max);

export const volunteerApplicationSchema = z.object({
  fullName: text(120),
  email: z.string().trim().email().max(180),
  phone: text(30),
  location: text(160),
  areasOfInterest: text(600),
  skills: text(800),
  experience: text(3000),
  availability: text(500),
  motivation: text(3000),
  additionalInformation: z.string().trim().max(3000).optional(),
});

export const mentorRegistrationSchema = z.object({
  fullName: text(120),
  email: z.string().trim().email().max(180),
  phone: text(30),
  profession: text(180),
  skills: text(800),
  experience: text(3000),
  areasOfMentorship: text(600),
  availability: text(500),
  bio: text(3000),
  motivation: text(3000),
});

export type VolunteerApplicationInput = z.infer<typeof volunteerApplicationSchema>;
export type MentorRegistrationInput = z.infer<typeof mentorRegistrationSchema>;
