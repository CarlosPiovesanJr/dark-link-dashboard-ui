import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { GlowingEffect } from "./glowing-effect";

interface AceternityCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  glowEffect?: boolean;
  onClick?: () => void;
}

export const AceternityCard = ({ 
  children, 
  className, 
  hoverable = true, 
  glowEffect = false,
  onClick 
}: AceternityCardProps) => {
  return (
    <motion.div
      className={cn(
        "aceternity-card",
        hoverable && "cursor-pointer",
        glowEffect && "glow-effect",
        className
      )}
      onClick={onClick}
      whileHover={hoverable ? { 
        y: -4, 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={hoverable ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

interface LinkCardProps {
  title: string;
  description?: string;
  url: string;
  icon?: ReactNode;
  category?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isPersonal?: boolean;
}

export const LinkCard = ({ 
  title, 
  description, 
  url, 
  icon, 
  category, 
  onEdit, 
  onDelete,
  isPersonal = false 
}: LinkCardProps) => {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -4, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative h-full rounded-xl border border-border/50 p-2 bg-card/50 backdrop-blur-sm overflow-hidden group">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        
        <div className="relative flex h-full flex-col justify-between gap-4 p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {icon}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                  {title}
                </h3>
                {category && (
                  <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full mt-1 inline-block">
                    {category}
                  </span>
                )}
              </div>
            </div>
            
            {isPersonal && (onEdit || onDelete) && (
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                    className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                    className="p-1.5 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
                  >
                    <Trash className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>
          
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
              {description}
            </p>
          )}
          
          <button
            onClick={handleClick}
            className="w-full bg-primary/90 hover:bg-primary text-primary-foreground text-xs py-2 px-3 rounded-lg transition-colors font-medium"
          >
            Acessar
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Import icons
import { Edit, Trash } from "lucide-react";
