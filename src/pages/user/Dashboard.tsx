
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useShortcuts, Shortcut } from "@/hooks/useShortcuts";
import { useFixedLinks } from "@/hooks/useFixedLinks";
import { LinkCard } from "@/components/ui/aceternity-card";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { ShortcutModal } from "@/components/ShortcutModal";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { 
  Plus,
  User,
  ExternalLink,
  Folder,
  Clock,
  LogOut,
  Home,
  Shield
} from "lucide-react";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState<Shortcut | undefined>(undefined);
  const { user, signOut } = useAuth();
  const { shortcuts, loading: shortcutsLoading, deleteShortcut } = useShortcuts();
  const { fixedLinks, loading: fixedLinksLoading } = useFixedLinks();
  const navigate = useNavigate();

  const isAdmin =
    user?.email === "admin@linkboard.com" || user?.email?.includes("admin");

  const handleEditShortcut = (shortcut: Shortcut) => {
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
    setEditingShortcut(undefined);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar className="border-border border-r" collapsible="offcanvas">
          <SidebarHeader className="flex items-center gap-2 border-b">
            <SidebarTrigger className="md:hidden" />
            <span className="font-semibold text-sm">LinkBoard</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/")}> 
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setModalOpen(true)}>
                  <Plus className="w-4 h-4" />
                  <span>Novo Link</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/admin")}> 
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="mt-auto border-t flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4" />
              {user?.email?.split("@")[0]}
            </div>
            <ThemeToggle />
            <AceternityButton
              variant="ghost"
              size="sm"
              onClick={signOut}
              icon={<LogOut className="w-4 h-4" />}
            >
              Sair
            </AceternityButton>
          </SidebarFooter>
        </Sidebar>
        <SidebarRail />
        <SidebarInset>
          <div className="min-h-screen bg-background">
            {/* Hero Section - Reduced height */}
            <section className="relative pt-20 pb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <ExternalLink className="w-8 h-8 text-white" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent mb-3">
              LinkBoard UI
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
              Bem-vindo de volta, <span className="text-foreground font-medium">{user?.email?.split('@')[0]}</span>! 
              Acesse rapidamente seus links favoritos.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Fixed Links Section */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Folder className="w-4 h-4 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold">Links do Sistema</h2>
            <div className="flex-1 border-t border-border/50" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <LinkCard
                    title={link.title}
                    description={link.description ?? undefined}
                    url={link.url}
                    icon={
                      link.icon ? (
                        <span className="text-lg">{link.icon}</span>
                      ) : (
                        <ExternalLink className="w-5 h-5" />
                      )
                    }
                    category={link.category ?? undefined}
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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-orange-500" />
              </div>
              <h2 className="text-xl font-bold">Meus Links</h2>
              <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-sm rounded-full font-medium">
                {shortcuts.length}
              </span>
            </div>
            
            <AceternityButton
              onClick={() => setModalOpen(true)}
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              className="hidden md:flex"
            >
              Adicionar Link
            </AceternityButton>
          </div>

          {shortcutsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-muted/20 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : shortcuts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {shortcuts.map((shortcut, index) => (
                <motion.div
                  key={shortcut.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <LinkCard
                    title={shortcut.title}
                    description={shortcut.description ?? undefined}
                    url={shortcut.url}
                    icon={
                      shortcut.icon ? (
                        <span className="text-lg">{shortcut.icon}</span>
                      ) : (
                        <ExternalLink className="w-5 h-5" />
                      )
                    }
                    category={shortcut.category ?? undefined}
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
              <h3 className="text-lg font-semibold mb-3">Nenhum link personalizado</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Comece adicionando seus links favoritos ao dashboard para acesso rápido
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
