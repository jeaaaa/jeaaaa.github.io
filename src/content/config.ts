import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  // schema: z.object({
  // 	title: z.string(),
  // 	description: z.string(),
  // 	// Transform string to Date object
  // 	pubDate: z.coerce.date(),
  // 	updatedDate: z.coerce.date().optional(),
  // 	heroImage: z.string().optional(),
  // }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    date: z.coerce.date(),
    description: z.string(),
    deprecated: z.boolean().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
