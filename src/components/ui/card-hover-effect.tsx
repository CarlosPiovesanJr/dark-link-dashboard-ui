import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
  cardSize = 'md',
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
  cardSize?: 'sm' | 'md' | 'lg';
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sizeClasses =
    cardSize === 'sm'
      ? 'h-[140px] max-w-xs p-4'
      : cardSize === 'md'
      ? 'h-[180px] max-w-md p-6'
      : 'h-[240px] max-w-lg p-8';

  const gridCols =
    cardSize === 'sm'
      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
      : cardSize === 'md'
      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div
      className={cn(
        `grid ${gridCols} gap-8 justify-items-center`,
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-muted/80 dark:bg-slate-800/[0.8] block rounded-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className={cn("rounded-2xl w-full overflow-hidden bg-card border border-transparent dark:border-white/[0.2] group-hover:border-primary relative z-20 flex flex-col justify-between", sizeClasses)}>
            <div className="relative z-50">
              <h4 className="text-foreground font-bold tracking-wide text-lg line-clamp-2">{item.title}</h4>
              <p className="mt-2 text-muted-foreground tracking-wide leading-relaxed text-sm line-clamp-3">{item.description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}; 