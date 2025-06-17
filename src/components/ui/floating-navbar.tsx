
"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
  rightElement,
  alwaysVisible = false,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
    onClick?: () => void;
  }[];
  className?: string;
  rightElement?: React.ReactNode;
  alwaysVisible?: boolean;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(alwaysVisible);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (alwaysVisible) return;
    
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: alwaysVisible ? 1 : 1,
          y: alwaysVisible ? 0 : -100,
        }}
        animate={{
          y: visible ? 0 : (alwaysVisible ? 0 : -100),
          opacity: visible ? 1 : (alwaysVisible ? 1 : 0),
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-4 inset-x-0 mx-auto border border-border/50 rounded-full bg-card/80 backdrop-blur-md shadow-lg z-50 pr-2 pl-6 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <button
            key={`link=${idx}`}
            onClick={navItem.onClick || (() => {})}
            className={cn(
              "relative text-foreground items-center flex space-x-1 hover:text-primary transition-colors duration-200"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm font-medium">{navItem.name}</span>
          </button>
        ))}
        {rightElement && (
          <div className="flex items-center space-x-2">
            {rightElement}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
