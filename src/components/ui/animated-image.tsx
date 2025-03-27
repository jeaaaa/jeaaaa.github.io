import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface AnimatedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  animation?:
    | "fade"
    | "zoom"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right";
  delay?: number;
}

export default function AnimatedImage({
  src,
  alt,
  className,
  wrapperClassName,
  animation = "fade",
  delay = 0,
  ...props
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 如果图片已经加载或者在视图中，不需要再观察
    if (isLoaded && isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // 一旦进入视图，不再需要观察
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // 图片10%进入视图就触发
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [isLoaded, isInView]);

  // 根据动画类型返回对应的类名
  const getAnimationClass = () => {
    if (!isInView) return "opacity-0";

    const baseClass = "transition-all duration-700";
    const delayClass = delay ? `delay-${delay}` : "";

    switch (animation) {
      case "zoom":
        return `${baseClass} ${delayClass} transform scale-100 opacity-100`;
      case "slide-up":
        return `${baseClass} ${delayClass} transform translate-y-0 opacity-100`;
      case "slide-down":
        return `${baseClass} ${delayClass} transform translate-y-0 opacity-100`;
      case "slide-left":
        return `${baseClass} ${delayClass} transform translate-x-0 opacity-100`;
      case "slide-right":
        return `${baseClass} ${delayClass} transform translate-x-0 opacity-100`;
      case "fade":
      default:
        return `${baseClass} ${delayClass} opacity-100`;
    }
  };

  // 根据动画类型返回初始状态类名
  const getInitialClass = () => {
    switch (animation) {
      case "zoom":
        return "transform scale-95 opacity-0";
      case "slide-up":
        return "transform translate-y-8 opacity-0";
      case "slide-down":
        return "transform -translate-y-8 opacity-0";
      case "slide-left":
        return "transform translate-x-8 opacity-0";
      case "slide-right":
        return "transform -translate-x-8 opacity-0";
      case "fade":
      default:
        return "opacity-0";
    }
  };

  return (
    <div
      ref={imageRef}
      className={cn(
        "overflow-hidden",
        isInView ? getAnimationClass() : getInitialClass(),
        wrapperClassName
      )}
    >
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setIsLoaded(true)}
        loading="lazy" // 使用浏览器原生懒加载
        {...props}
      />
    </div>
  );
}
