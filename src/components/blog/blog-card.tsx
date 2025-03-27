import React from "react";
import { formatDate } from "../../lib/utils";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  category: {
    name: string;
    color?: string;
  };
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  readingTime?: number;
};

// 分类徽章组件
const CategoryBadge = ({ category }: { category: BlogPost["category"] }) => {
  // 预定义颜色映射
  const colorMap: Record<string, string> = {
    技术: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    设计: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    生活: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    旅行: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    default: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
  };

  const colorClass = colorMap[category.name] || colorMap.default;

  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${colorClass}`}
    >
      {category.name}
    </span>
  );
};

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover-lift">
      <a href={`/blog/${post.slug}`} className="block">
        <div className="aspect-video overflow-hidden">
          <img
            src={post.coverImage}
            alt={`${post.title}的封面图片`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge category={post.category} />
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {formatDate(post.publishDate)}
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
              <img
                src={post.author.avatar}
                alt={`${post.author.name}的头像`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>
        </div>
      </a>
    </article>
  );
}
