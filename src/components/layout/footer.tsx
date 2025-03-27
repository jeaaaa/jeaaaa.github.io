import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <i className="bx bx-book-heart text-xl text-primary-600 dark:text-primary-400"></i>
          <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
            思考随笔
          </span>
        </div>

        <div className="flex gap-6 mb-4 md:mb-0">
          <a
            href="/"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            首页
          </a>
          <a
            href="/blog"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            博客
          </a>
          <a
            href="/about"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            关于
          </a>
        </div>

        <div className="flex gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <i className="bx bxl-twitter text-xl"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <i className="bx bxl-github text-xl"></i>
          </a>
        </div>
      </div>

      <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
        © {currentYear} 思考随笔. 保留所有权利.
      </div>
    </footer>
  );
}
