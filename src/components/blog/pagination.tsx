import React from "react";
import { cn } from "../../lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // 如果总页数小于等于1，不显示分页
  if (totalPages <= 1) return null;

  // 创建页码数组
  const getPageNumbers = () => {
    const pages = [];

    // 显示当前页和其前后一页
    const rangeStart = Math.max(1, currentPage - 1);
    const rangeEnd = Math.min(totalPages, currentPage + 1);

    // 总是显示第一页
    if (rangeStart > 1) {
      pages.push(1);
      if (rangeStart > 2) {
        // 如果第一页和范围起始页之间有间隔，添加省略号
        pages.push("...");
      }
    }

    // 添加范围内的页码
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // 总是显示最后一页
    if (rangeEnd < totalPages) {
      if (rangeEnd < totalPages - 1) {
        // 如果范围结束页和最后一页之间有间隔，添加省略号
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="mt-8 flex justify-center" aria-label="分页导航">
      <div className="inline-flex rounded-md shadow-sm">
        {/* 上一页按钮 */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "relative inline-flex items-center rounded-l-md px-3 py-2 border border-gray-300 dark:border-gray-700 transition-colors",
            currentPage === 1
              ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
          aria-label="上一页"
        >
          <i className="bx bx-chevron-left text-lg"></i>
          <span className="sr-only">上一页</span>
        </button>

        {/* 页码按钮 */}
        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={cn(
                "relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 transition-colors",
                page === currentPage
                  ? "text-white bg-primary-600 border-primary-600 hover:bg-primary-700"
                  : "text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            >
              {page}
            </span>
          )
        )}

        {/* 下一页按钮 */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "relative inline-flex items-center rounded-r-md px-3 py-2 border border-gray-300 dark:border-gray-700 transition-colors",
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
          aria-label="下一页"
        >
          <i className="bx bx-chevron-right text-lg"></i>
          <span className="sr-only">下一页</span>
        </button>
      </div>
    </nav>
  );
}
