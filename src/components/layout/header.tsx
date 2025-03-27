import React, { useState } from "react";
import ThemeToggle from "../ui/theme-toggle";
import { cn } from "../../lib/utils";

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

type HeaderProps = {
  currentPath: string;
};

export default function Header({ currentPath }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      label: "首页",
      href: "/",
      active: currentPath === "/",
    },
    {
      label: "博客",
      href: "/blog",
      active: currentPath.startsWith("/blog"),
    },
    {
      label: "关于",
      href: "/about",
      active: currentPath === "/about",
    },
  ];

  return (
    <header className="py-4 sm:py-6 w-full max-w-7xl mx-auto">
      <nav className="flex justify-between items-center px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <i className="bx bx-book-heart text-2xl text-primary-600 dark:text-primary-400"></i>
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
            思考随笔
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "font-medium transition-colors",
                item.active
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Theme Toggle and Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <div className="z-50">
            <ThemeToggle />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <i
                className={`bx ${mobileMenuOpen ? "bx-x" : "bx-menu"} text-2xl`}
              ></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 pt-20 px-6">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-xl font-medium transition-colors py-3 border-b border-gray-100 dark:border-gray-800",
                  item.active
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-800 dark:text-gray-200"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
