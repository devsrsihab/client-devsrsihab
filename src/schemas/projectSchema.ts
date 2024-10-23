import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  content: z.string().min(50, "Content must be at least 50 characters long"),
  technologies: z.string().min(1, "At least one technology is required"),
  frontendGithubLink: z.string().url("Invalid frontend GitHub URL"),
  backendGithubLink: z.string().url("Invalid backend GitHub URL"),
  frontendLiveLink: z.string().url("Invalid frontend live URL"),
  backendLiveLink: z.string().url("Invalid backend live URL"),
  isFeatured: z.boolean().optional(),
});
