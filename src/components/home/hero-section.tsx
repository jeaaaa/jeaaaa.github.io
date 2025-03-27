import React from "react";
import { Button } from "../ui/button";
import AnimatedImage from "../ui/animated-image";

export default function HeroSection() {
  return (
    <section className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6">
      <div className="w-full md:w-1/2 space-y-6 md:space-y-8 fade-in">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="block slide-up">探索思考，</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 slide-up delay-200">
            分享生活点滴
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl slide-up delay-300">
          欢迎来到我的个人世界，这里记录着我对技术、设计、生活的思考与感悟。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 slide-up delay-300">
          <Button asChild size="lg">
            <a href="/blog">
              阅读博客
              <i className="bx bx-right-arrow-alt ml-2"></i>
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/about">了解我</a>
          </Button>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <AnimatedImage
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
          alt="Writing on laptop"
          className="w-full h-full object-cover mix-blend-overlay opacity-80"
          wrapperClassName="relative aspect-square w-full max-w-md rounded-2xl overflow-hidden gradient-bg"
          animation="fade"
          delay={400}
        />
      </div>
    </section>
  );
}
