import { z } from "zod";

export const scholarshipApplicationSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  dateOfBirth: z.string().date(),
  address: z.string().trim().min(5).max(300),
  schoolOrInstitution: z.string().trim().min(2).max(180),
  courseOrProgram: z.string().trim().min(2).max(180),
  personalStatement: z.string().trim().min(100).max(5000),
  consentToReview: z.literal(true),
});

export type ScholarshipApplicationInput = z.infer<typeof scholarshipApplicationSchema>;

const allowedDocuments = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
} as const;

export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;

export function validateDocumentMetadata(file: { name: string; type: string; size: number }) {
  const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
  const extensions = allowedDocuments[file.type as keyof typeof allowedDocuments];
  if (!extensions || !extensions.includes(extension as never)) throw new Error("Unsupported document type.");
  if (file.size <= 0 || file.size > MAX_DOCUMENT_SIZE_BYTES) throw new Error("Document must be smaller than 10 MB.");
  return { name: file.name.replace(/[^a-zA-Z0-9._-]/g, "_"), type: file.type, size: file.size };
}
