import { z } from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(40),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  bio: z.string().optional(),
  portfolioWebsite: z.string().url().optional().or(z.literal("")),
  location: z.string().min(5).max(50).optional().or(z.literal("")),
});
