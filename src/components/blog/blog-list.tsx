import React, { useState } from "react";
import BlogCard, { type BlogPost } from "./blog-card";
import CategoryFilter from "./category-filter";
import Pagination from "./pagination";

type BlogListProps = {
  posts: BlogPost[];
  categories: { name: string; count: number }[];
};

export default function BlogList({ posts, categories }: BlogListProps) {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // 每页显示的文章数量

  // 根据当前选择的分类筛选文章
  const filteredPosts =
    currentCategory === "all"
      ? posts
      : posts.filter((post) => post.category.name === currentCategory);

  // 计算总页数
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // 获取当前页的文章
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // 切换分类时重置页码
  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="mb-8 fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">博客文章</h1>
        <CategoryFilter
          categories={categories}
          activeCategory={currentCategory}
          onChange={handleCategoryChange}
        />
      </div>

      {currentPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 slide-up">
            {currentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            没有找到符合条件的文章。
          </p>
        </div>
      )}
    </>
  );
}
