
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

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
    <AceternityCard className="p-6 group" hoverable glowEffect>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            {category && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {category}
              </span>
            )}
          </div>
        </div>
        
        {isPersonal && (onEdit || onDelete) && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
              >
                <Trash className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
      )}
      
      <button
        onClick={handleClick}
        className="w-full aceternity-button text-sm py-2"
      >
        Acessar
      </button>
    </AceternityCard>
  );
};

// Import icons
import { Edit, Trash } from "lucide-react";
