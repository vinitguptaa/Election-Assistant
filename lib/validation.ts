import { z } from "zod";

export const assistantRequestSchema = z.object({
  message: z.string().min(3).max(2000),
  language: z.string().default("en"),
  region: z.string().optional(),
  userId: z.string().optional()
});

export const eligibilitySchema = z.object({
  age: z.coerce.number().int().min(0).max(125),
  citizenship: z.string().min(2),
  region: z.string().min(2),
  hasGovernmentId: z.boolean(),
  isRegistered: z.boolean()
});

export const boothSearchSchema = z.object({
  region: z.string().optional(),
  pinCode: z.string().optional(),
  q: z.string().optional()
});

export const newsQuerySchema = z.object({
  region: z.string().optional(),
  verified: z.coerce.boolean().optional()
});

export const candidateQuerySchema = z.object({
  region: z.string().optional(),
  constituency: z.string().optional(),
  q: z.string().optional()
});

export const timelineCreateSchema = z.object({
  electionId: z.string(),
  title: z.string().min(3),
  phase: z.string().min(2),
  region: z.string().min(2),
  description: z.string().min(10),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date().optional(),
  sourceUrl: z.string().url().optional()
});
