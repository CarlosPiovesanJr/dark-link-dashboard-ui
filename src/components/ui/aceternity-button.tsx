
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface AceternityButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const AceternityButton = ({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  disabled,
  onClick,
  type = "button",
}: AceternityButtonProps) => {
  const variants = {
    primary: "bg-purple-500 text-white hover:bg-purple-600 shadow-lg shadow-purple-500/25",
    secondary: "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25",
    outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base"
  };

  return (
    <motion.button
      type={type}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <div className={cn("flex items-center gap-2", loading && "opacity-0")}>
        {icon && <span className="w-4 h-4">{icon}</span>}
        {children}
      </div>
    </motion.button>
  );
};
