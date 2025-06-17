
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useShortcuts } from "@/hooks/useShortcuts";
import { useFixedLinks } from "@/hooks/useFixedLinks";
import { LinkCard } from "@/components/ui/aceternity-card";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { ShortcutModal } from "@/components/ShortcutModal";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { 
  Plus, 
  LogOut, 
  User, 
  Settings,
  ExternalLink,
  Folder,
  Clock,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState(null);
  const { user, signOut } = useAuth();
  const { shortcuts, loading: shortcutsLoading, deleteShortcut } = useShortcuts();
  const { fixedLinks, loading: fixedLinksLoading } = useFixedLinks();

  const handleEditShortcut = (shortcut: any) => {
    setEditingShortcut(shortcut);
    setModalOpen(true);
  };

  const handleDeleteShortcut = async (id: string) => {
    if (window.confirm("Tem certeza que deseja remover este link?")) {
      await deleteShortcut(id);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingShortcut(null);
  };

  // Check if user is admin (simple check by email)
  const isAdmin = user?.email === 'admin@linkboard.com' || user?.email?.includes('admin');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg font-semibold">LinkBoard UI</h1>
                <p className="text-xs text-muted-foreground">
                  Bem-vindo, {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AceternityButton
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(true)}
                icon={<Plus className="w-4 h-4" />}
              >
                Novo Link
              </AceternityButton>

              {isAdmin && (
                <Link to="/admin">
                  <AceternityButton
                    variant="secondary"
                    size="sm"
                    icon={<Shield className="w-4 h-4" />}
                  >
                    Admin
                  </AceternityButton>
                </Link>
              )}

              <ThemeToggle />

              <AceternityButton
                variant="ghost"
                size="sm"
                onClick={signOut}
                icon={<LogOut className="w-4 h-4" />}
              >
                Sair
              </AceternityButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-orange-500" />
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="flex-1 border-t border-border" />
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {new Date().toLocaleDateString('pt-BR')}
            </span>
          </div>
          <p className="text-muted-foreground">
            Acesse rapidamente seus links e ferramentas favoritas.
          </p>
        </motion.div>

        {/* Fixed Links Section */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Folder className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold">Links do Sistema</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fixedLinksLoading ? (
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-muted/20 rounded-xl animate-pulse"
                />
              ))
            ) : (
              fixedLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <LinkCard
                    title={link.title}
                    description={link.description}
                    url={link.url}
                    icon={
                      link.icon ? (
                        <span className="text-lg">{link.icon}</span>
                      ) : (
                        <ExternalLink className="w-5 h-5" />
                      )
                    }
                    category={link.category}
                  />
                </motion.div>
              ))
            )}
          </div>
        </motion.section>

        {/* Personal Links Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              <h3 className="text-xl font-semibold">Meus Links</h3>
              <span className="px-2 py-1 bg-orange-500/10 text-orange-500 text-sm rounded-full">
                {shortcuts.length}
              </span>
            </div>
            
            <AceternityButton
              onClick={() => setModalOpen(true)}
              size="sm"
              icon={<Plus className="w-4 h-4" />}
            >
              Adicionar Link
            </AceternityButton>
          </div>

          {shortcutsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-muted/20 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : shortcuts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {shortcuts.map((shortcut, index) => (
                <motion.div
                  key={shortcut.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <LinkCard
                    title={shortcut.title}
                    description={shortcut.description}
                    url={shortcut.url}
                    icon={
                      shortcut.icon ? (
                        <span className="text-lg">{shortcut.icon}</span>
                      ) : (
                        <ExternalLink className="w-5 h-5" />
                      )
                    }
                    category={shortcut.category}
                    isPersonal={true}
                    onEdit={() => handleEditShortcut(shortcut)}
                    onDelete={() => handleDeleteShortcut(shortcut.id)}
                  />
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
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="text-lg font-medium mb-2">Nenhum link personalizado</h4>
              <p className="text-muted-foreground mb-6">
                Comece adicionando seus links favoritos ao dashboard
              </p>
              <AceternityButton
                onClick={() => setModalOpen(true)}
                icon={<Plus className="w-4 h-4" />}
              >
                Adicionar Primeiro Link
              </AceternityButton>
            </motion.div>
          )}
        </motion.section>
      </main>

      {/* Modal */}
      <ShortcutModal
        isOpen={modalOpen}
        onClose={closeModal}
        shortcut={editingShortcut}
      />
    </div>
  );
};

export default Dashboard;
