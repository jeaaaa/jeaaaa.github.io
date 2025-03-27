import React from "react";
import { cn } from "../../lib/utils";

type Category = {
  name: string;
  count?: number;
};

type CategoryFilterProps = {
  categories: Category[];
  activeCategory: string;
  onChange: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  activeCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <button
        onClick={() => onChange("all")}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
          activeCategory === "all"
            ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        )}
      >
        全部
      </button>

      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onChange(category.name)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeCategory === category.name
              ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          {category.name}
          {category.count && ` (${category.count})`}
        </button>
      ))}
    </div>
  );
}
