import React, { memo } from "react";
import type { ReactNode } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  m,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";

import { cn } from "@/lib/utils";

export interface HeaderMenu {
  title: string;
  path: string;
  type?: string;
  icon?: ReactNode;
  subMenu?: HeaderMenu[];
}
const { pathname } = Astro.url;

const ForDesktop: Component<{
  shouldHideNavBg?: boolean;
  animatedIcon?: boolean;
}> = ({ className, shouldHideNavBg, animatedIcon = true }) => {
  const { config: headerMenuConfig } = useHeaderConfig();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);
  const handleMouseMove = React.useCallback(
    ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const bounds = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - bounds.left);
      mouseY.set(clientY - bounds.top);
      radius.set(Math.sqrt(bounds.width ** 2 + bounds.height ** 2) / 2.5);
    },
    [mouseX, mouseY, radius]
  );

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color) 0%, transparent 65%)`;

  return (
    <m.nav
      layout="size"
      onMouseMove={handleMouseMove}
      className={cn(
        "relative",
        "rounded-full bg-gradient-to-b from-zinc-50/70 to-white/90",
        "shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md",
        "dark:from-zinc-900/70 dark:to-zinc-800/90 dark:ring-zinc-100/10",
        "group [--spotlight-color:hsl(var(--a)_/_0.05)]",
        "duration-200",
        shouldHideNavBg && "!bg-none !shadow-none !ring-transparent",
        className
      )}
    >
      {/* Spotlight overlay */}
      <m.div
        className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
        aria-hidden="true"
      />
      <div className="flex px-4 font-medium text-zinc-800 dark:text-zinc-200">
        {headerMenuConfig.map((section) => {
          const subItemActive =
            section.subMenu?.findIndex((item) => {
              return item.path === pathname || pathname.slice(1) === item.path;
            }) ?? -1;

          return (
            <HeaderMenuItem
              iconLayout={animatedIcon}
              section={section}
              key={section.path}
              subItemActive={section.subMenu?.[subItemActive]}
              isActive={
                pathname === section.path ||
                pathname.startsWith(`${section.path}/`) ||
                subItemActive > -1 ||
                false
              }
            />
          );
        })}
      </div>
    </m.nav>
  );
};

const HeaderMenuItem = memo<{
  section: HeaderMenu;
  isActive: boolean;
  subItemActive?: HeaderMenu;
  iconLayout?: boolean;
}>(({ section, isActive, subItemActive, iconLayout }) => {
  const href = section.path;

  return (
    <AnimatedItem
      href={href}
      isActive={isActive}
      className="transition-[padding]"
    >
      <span className="relative flex items-center">
        {isActive && (
          <m.span
            layoutId={iconLayout ? "header-menu-icon" : undefined}
            className="mr-2 flex items-center"
          >
            {subItemActive?.icon ?? section.icon}
          </m.span>
        )}
        <m.span layout>{subItemActive?.title ?? section.title}</m.span>
      </span>
    </AnimatedItem>
  );
});

function AnimatedItem({
  href,
  children,
  className,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}) {
  const isExternal = href.startsWith("http");
  return (
    <div>
      <a
        href={href}
        className={cn(
          "relative block whitespace-nowrap px-4 py-2 transition",
          isActive ? "text-accent" : "hover:text-accent-focus",
          isActive ? "active" : "",
          className
        )}
        target={isExternal ? "_blank" : undefined}
      >
        {children}
        {isActive && (
          <m.span
            className={cn(
              "absolute inset-x-1 -bottom-px h-px",
              "bg-gradient-to-r from-accent/0 via-accent/70 to-accent/0"
            )}
            layoutId="active-nav-item"
          />
        )}
      </a>
    </div>
  );
}
