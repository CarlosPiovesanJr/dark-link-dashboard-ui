
import { useState } from "react";
import { motion } from "framer-motion";
import { useFixedLinks } from "@/hooks/useFixedLinks";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { AceternityCard } from "@/components/ui/aceternity-card";
import { FixedLinkModal } from "@/components/admin/FixedLinkModal";
import { 
  Plus, 
  Edit, 
  Trash, 
  ExternalLink,
  Link as LinkIcon,
  Tag,
  Calendar
} from "lucide-react";

const FixedLinksAdmin = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const { fixedLinks, loading, deleteFixedLink } = useFixedLinks();

  const handleEditLink = (link: any) => {
    setEditingLink(link);
    setModalOpen(true);
  };

  const handleDeleteLink = async (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja remover o link "${title}"?`)) {
      await deleteFixedLink(id);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingLink(null);
  };

  const openLinkInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AdminLayout 
      title="Gerenciar Links Fixos" 
      description="Gerencie os links fixos que aparecem para todos os usuários do sistema"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-orange-500" />
          <h3 className="text-xl font-semibold">Links Fixos do Sistema</h3>
          <span className="px-2 py-1 bg-orange-500/10 text-orange-500 text-sm rounded-full">
            {fixedLinks.length}
          </span>
        </div>
        
        <AceternityButton
          onClick={() => setModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Novo Link Fixo
        </AceternityButton>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-muted/20 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : fixedLinks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fixedLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <AceternityCard className="p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                      {link.icon ? (
                        <span className="text-lg">{link.icon}</span>
                      ) : (
                        <ExternalLink className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-orange-500 transition-colors">
                        {link.title}
                      </h4>
                      {link.category && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full inline-flex items-center gap-1 mt-1">
                          <Tag className="w-3 h-3" />
                          {link.category}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditLink(link)}
                      className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-colors"
                      title="Editar link"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteLink(link.id, link.title)}
                      className="p-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
                      title="Remover link"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {link.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {link.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {link.created_at ? new Date(link.created_at).toLocaleDateString('pt-BR') : 'Sistema'}
                  </span>
                  
                  <AceternityButton
                    size="sm"
                    variant="outline"
                    onClick={() => openLinkInNewTab(link.url)}
                    icon={<ExternalLink className="w-3 h-3" />}
                  >
                    Testar
                  </AceternityButton>
                </div>
              </AceternityCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-muted/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LinkIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h4 className="text-lg font-medium mb-2">Nenhum link fixo configurado</h4>
          <p className="text-muted-foreground mb-6">
            Comece adicionando links fixos que serão exibidos para todos os usuários
          </p>
          <AceternityButton
            onClick={() => setModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Criar Primeiro Link Fixo
          </AceternityButton>
        </motion.div>
      )}

      <FixedLinkModal
        isOpen={modalOpen}
        onClose={closeModal}
        fixedLink={editingLink}
      />
    </AdminLayout>
  );
};

export default FixedLinksAdmin;
