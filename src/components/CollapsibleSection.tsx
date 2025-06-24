
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
  actions?: React.ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  children,
  defaultOpen = true,
  count,
  actions,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.section
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 group hover:bg-muted/50 rounded-lg p-2 -ml-2 transition-colors"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.div>
          <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
            {title}
          </h2>
          {count !== undefined && (
            <span className="px-3 py-1 bg-purple-500/10 text-purple-500 text-sm rounded-full font-medium">
              {count}
            </span>
          )}
          <div className="flex-1 border-t border-border/50" />
        </button>
        
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
