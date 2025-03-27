import React from "react";
import { Helmet } from "react-helmet";

type SeoProps = {
  title: string;
  description?: string;
  canonicalUrl?: string;
  image?: string;
  ogType?: "website" | "article";
  articlePublishDate?: string;
  articleAuthor?: string;
};

export default function Seo({
  title,
  description = "思考随笔 - 个人博客网站，分享技术、设计和生活",
  canonicalUrl,
  image = "/og-image.jpg",
  ogType = "website",
  articlePublishDate,
  articleAuthor,
}: SeoProps) {
  const siteUrl = "https://yourblog.com"; // 替换为你的网站URL
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* 基础元数据 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* 文章特定元数据 */}
      {ogType === "article" && articlePublishDate && (
        <meta property="article:published_time" content={articlePublishDate} />
      )}
      {ogType === "article" && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
    </Helmet>
  );
}
