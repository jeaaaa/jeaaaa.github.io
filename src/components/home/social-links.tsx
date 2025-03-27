import React from "react";

type SocialLink = {
  name: string;
  url: string;
  icon: string;
};

export default function SocialLinks() {
  const socialLinks: SocialLink[] = [
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: "bxl-twitter",
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: "bxl-instagram",
    },
    {
      name: "GitHub",
      url: "https://github.com",
      icon: "bxl-github",
    },
  ];

  return (
    <div className="py-6 w-full max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-center gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:scale-110 transform duration-200"
            aria-label={link.name}
          >
            <i className={`bx ${link.icon} text-2xl`}></i>
          </a>
        ))}
      </div>
    </div>
  );
}
