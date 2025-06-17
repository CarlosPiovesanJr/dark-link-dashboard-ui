
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { AceternityInput } from "@/components/ui/aceternity-input";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { AceternityCard } from "@/components/ui/aceternity-card";
import { useShortcuts, Shortcut } from "@/hooks/useShortcuts";
import { X, Plus, Edit, Link, Type, FileText, Tag } from "lucide-react";

const shortcutSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  url: z.string().url("URL inválida"),
  description: z.string().optional(),
  category: z.string().optional(),
  icon: z.string().optional(),
});

type ShortcutFormData = z.infer<typeof shortcutSchema>;

interface ShortcutModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortcut?: Shortcut;
}

export const ShortcutModal = ({ isOpen, onClose, shortcut }: ShortcutModalProps) => {
  const [loading, setLoading] = useState(false);
  const { createShortcut, updateShortcut } = useShortcuts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ShortcutFormData>({
    resolver: zodResolver(shortcutSchema),
  });

  useEffect(() => {
    if (shortcut) {
      setValue("title", shortcut.title);
      setValue("url", shortcut.url);
      setValue("description", shortcut.description || "");
      setValue("category", shortcut.category || "");
      setValue("icon", shortcut.icon || "");
    } else {
      reset();
    }
  }, [shortcut, setValue, reset]);

  const onSubmit = async (data: ShortcutFormData) => {
    setLoading(true);
    
    try {
      if (shortcut) {
        await updateShortcut(shortcut.id, data);
      } else {
        await createShortcut(data);
      }
      onClose();
      reset();
    } catch (error) {
      console.error("Error saving shortcut:", error);
    }
    
    setLoading(false);
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <AceternityCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {shortcut ? (
                      <Edit className="w-5 h-5 text-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {shortcut ? "Editar Link" : "Novo Link"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {shortcut 
                        ? "Atualize as informações do link"
                        : "Adicione um novo link ao seu dashboard"
                      }
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <AceternityInput
                  label="Título"
                  icon={<Type className="w-4 h-4" />}
                  placeholder="Nome do link"
                  error={errors.title?.message}
                  {...register("title")}
                />

                <AceternityInput
                  label="URL"
                  icon={<Link className="w-4 h-4" />}
                  placeholder="https://exemplo.com"
                  error={errors.url?.message}
                  {...register("url")}
                />

                <AceternityInput
                  label="Descrição (opcional)"
                  icon={<FileText className="w-4 h-4" />}
                  placeholder="Breve descrição do link"
                  error={errors.description?.message}
                  {...register("description")}
                />

                <AceternityInput
                  label="Categoria (opcional)"
                  icon={<Tag className="w-4 h-4" />}
                  placeholder="Ex: Trabalho, Pessoal, Ferramentas"
                  error={errors.category?.message}
                  {...register("category")}
                />

                <AceternityInput
                  label="Ícone (opcional)"
                  icon={<span className="w-4 h-4">🔗</span>}
                  placeholder="Ex: 📊, 🛠️, 📝"
                  error={errors.icon?.message}
                  {...register("icon")}
                />

                <div className="flex gap-3 pt-4">
                  <AceternityButton
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleClose}
                  >
                    Cancelar
                  </AceternityButton>
                  
                  <AceternityButton
                    type="submit"
                    className="flex-1"
                    loading={loading}
                    icon={shortcut ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  >
                    {shortcut ? "Atualizar" : "Criar"}
                  </AceternityButton>
                </div>
              </form>
            </AceternityCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
