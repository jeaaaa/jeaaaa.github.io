import { defineCollection, z } from "astro:content";

// 博客文章集合的Schema
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    lastUpdated: z.date().optional(),
    coverImage: z.string(),
    category: z.string(),
    author: z.object({
      name: z.string(),
      avatar: z.string(),
    }),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

// 导出所有集合配置
export const collections = {
  blog: blogCollection,
};
