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
  cardSize?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LinkCard = ({ 
  title, 
  description, 
  url, 
  icon, 
  category, 
  onEdit, 
  onDelete,
  isPersonal = false,
  cardSize = 'md',
  className = '',
}: LinkCardProps) => {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const cardSquareSize =
    cardSize === 'sm' ? 'w-44 h-44' :
    cardSize === 'md' ? 'w-64 h-64' :
    'w-80 h-80';

  // Classes dinâmicas por tamanho
  const iconSize = cardSize === 'sm' ? 'w-8 h-8' : cardSize === 'md' ? 'w-10 h-10' : 'w-14 h-14';
  const titleSize = cardSize === 'sm' ? 'text-sm' : cardSize === 'md' ? 'text-base' : 'text-lg';
  const descSize = cardSize === 'sm' ? 'text-xs' : cardSize === 'md' ? 'text-sm' : 'text-base';
  const btnSize = cardSize === 'sm' ? 'text-xs py-1.5 px-2.5' : cardSize === 'md' ? 'text-sm py-2 px-3' : 'text-base py-3 px-4';
  const padding = cardSize === 'sm' ? 'p-3' : 'p-8';
  const gap = cardSize === 'sm' ? 'gap-3' : cardSize === 'md' ? 'gap-4' : 'gap-6';

  return (
    <AceternityCard className={`group ${cardSquareSize.replace(/p-\d+/g, '')} ${className?.replace(/p-\d+/g, '')}`.trim()}>
      <div className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden group w-full h-full">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className={`relative flex flex-col ${gap} h-full p-4`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className={`${iconSize} rounded-lg bg-primary/10 flex items-center justify-center text-primary`}>
                  {icon}
                </div>
              )}
              <div className="w-full">
                <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors ${titleSize} break-words whitespace-normal leading-tight line-clamp-2`} title={title}>
                  {title}
                </h3>
                {/* Categoria só aparece a partir de 'md' */}
                {category && cardSize !== 'sm' && (
                  <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full mt-1 inline-block truncate max-w-full" title={category}>
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
          {/* Descrição só aparece a partir de 'md' */}
          {description && (cardSize === 'md' || cardSize === 'lg') && (
            <p className={`${descSize} text-muted-foreground break-words whitespace-normal leading-tight line-clamp-3`} title={description}>{description}</p>
          )}
          <button
            onClick={handleClick}
            className={`w-full bg-primary/90 hover:bg-primary text-primary-foreground rounded-lg transition-colors font-medium mt-auto ${btnSize} truncate`}
          >
            Acessar
          </button>
        </div>
      </div>
    </AceternityCard>
  );
};

// Import icons
import { Edit, Trash } from "lucide-react";
