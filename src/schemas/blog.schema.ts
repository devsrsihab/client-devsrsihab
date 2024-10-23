import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  categories: z.string(), // Assuming categories are sent as string IDs
  tags: z.string(),
});
