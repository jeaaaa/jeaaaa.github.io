import { useEffect, useState } from "react";
import { Button } from "./button";
import { getSystemTheme } from "../../lib/utils";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // 页面加载时检查本地存储的主题偏好
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    // 如果有存储的主题偏好，使用它，否则按系统偏好
    const initialTheme = storedTheme || getSystemTheme();
    setTheme(initialTheme);

    // 监听系统主题变化
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  // 在主题状态加载前不渲染任何内容，避免闪烁
  if (theme === null) return null;

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md transition-all duration-300"
      aria-label={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
    >
      {theme === "dark" ? (
        <i className="bx bx-sun text-xl text-yellow-400"></i>
      ) : (
        <i className="bx bx-moon text-xl text-gray-700"></i>
      )}
    </Button>
  );
}
