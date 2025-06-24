
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { AceternityInput } from "@/components/ui/aceternity-input";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { AceternityCard } from "@/components/ui/aceternity-card";
import { useFixedLinks, FixedLink } from "@/hooks/useFixedLinks";
import { X, Plus, Edit, Link, Type, FileText, Tag } from "lucide-react";

const fixedLinkSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  url: z.string().url("URL inválida"),
  description: z.string().optional(),
  category: z.string().optional(),
  icon: z.string().optional(),
});

type FixedLinkFormData = z.infer<typeof fixedLinkSchema>;

interface FixedLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  fixedLink?: FixedLink;
}

export const FixedLinkModal = ({ isOpen, onClose, fixedLink }: FixedLinkModalProps) => {
  const [loading, setLoading] = useState(false);
  const { createFixedLink, updateFixedLink } = useFixedLinks();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FixedLinkFormData>({
    resolver: zodResolver(fixedLinkSchema),
  });

  useEffect(() => {
    if (fixedLink) {
      setValue("title", fixedLink.title);
      setValue("url", fixedLink.url);
      setValue("description", fixedLink.description || "");
      setValue("category", fixedLink.category || "");
      setValue("icon", fixedLink.icon || "");
    } else {
      reset();
    }
  }, [fixedLink, setValue, reset]);

  const onSubmit = async (data: FixedLinkFormData) => {
    setLoading(true);
    
    try {
      const linkData = {
        title: data.title,
        url: data.url,
        description: data.description,
        category: data.category,
        icon: data.icon,
      };

      if (fixedLink) {
        await updateFixedLink(fixedLink.id, linkData);
      } else {
        await createFixedLink(linkData);
      }
      onClose();
      reset();
    } catch (error) {
      console.error("Error saving fixed link:", error);
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
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

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
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    {fixedLink ? (
                      <Edit className="w-5 h-5 text-purple-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-purple-500" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {fixedLink ? "Editar Link Fixo" : "Novo Link Fixo"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {fixedLink 
                        ? "Atualize as informações do link fixo"
                        : "Adicione um novo link fixo ao sistema"
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
                  placeholder="Ex: Desenvolvimento, Operações"
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
                    icon={fixedLink ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  >
                    {fixedLink ? "Atualizar" : "Criar"}
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
