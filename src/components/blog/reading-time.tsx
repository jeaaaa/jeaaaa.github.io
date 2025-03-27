import React from "react";
import { getReadingTime } from "../../lib/utils";

type ReadingTimeProps = {
  content: string;
};

export default function ReadingTime({ content }: ReadingTimeProps) {
  const minutes = getReadingTime(content);

  return (
    <div className="text-sm text-gray-500 dark:text-gray-400 italic mb-6">
      阅读时间: 约 {minutes} 分钟
    </div>
  );
}
