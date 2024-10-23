import { z } from "zod";

const baseSchema = {
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  tags: z.string().optional(),
};

export const createBlogSchema = z.object({
  ...baseSchema,
  image: z.string().optional(), // Optional for create, as it might be added later
});

export const updateBlogSchema = z.object({
  ...baseSchema,
  image: z.string().optional(), // Optional for update, as it might not be changed
});
