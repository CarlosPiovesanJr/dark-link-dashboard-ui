
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { AceternityInput } from "@/components/ui/aceternity-input";
import { Textarea } from "@/components/ui/textarea";
import { useCustomFolders, CustomFolder } from "@/hooks/useCustomFolders";
import { X, Folder, Plus } from "lucide-react";

interface FolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  folder?: CustomFolder;
}

export const FolderModal: React.FC<FolderModalProps> = ({
  isOpen,
  onClose,
  folder,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { createFolder, updateFolder } = useCustomFolders();

  useEffect(() => {
    if (folder) {
      setName(folder.name || "");
      setDescription(folder.description || "");
      setIcon(folder.icon || "");
    } else {
      setName("");
      setDescription("");
      setIcon("");
    }
  }, [folder, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    setLoading(true);
    try {
      const folderData = {
        name: name.trim(),
        description: description.trim() || null,
        icon: icon.trim() || null,
      };

      if (folder) {
        await updateFolder(folder.id, folderData);
      } else {
        await createFolder(folderData);
      }

      onClose();
    } catch (error) {
      console.error("Error saving folder:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5" />
            {folder ? "Editar Pasta" : "Nova Pasta"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome da Pasta</label>
            <AceternityInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome da pasta"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ícone (emoji)</label>
            <AceternityInput
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="📁"
              maxLength={2}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição (opcional)</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o conteúdo da pasta"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <AceternityButton
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </AceternityButton>
            <AceternityButton
              type="submit"
              disabled={loading || !name.trim()}
              icon={folder ? undefined : <Plus className="w-4 h-4" />}
            >
              {loading ? "Salvando..." : folder ? "Atualizar" : "Criar Pasta"}
            </AceternityButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
