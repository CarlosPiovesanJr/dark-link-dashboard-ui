import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useShortcuts, Shortcut } from "@/hooks/useShortcuts";
import { useFixedLinks } from "@/hooks/useFixedLinks";
import { useCustomFolders, CustomFolder } from "@/hooks/useCustomFolders";
import { LinkCard } from "@/components/ui/aceternity-card";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { ShortcutModal } from "@/components/ShortcutModal";
import { FolderModal } from "@/components/FolderModal";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MainNavigation } from "@/components/common/MainNavigation";
import { 
  Plus,
  User,
  ExternalLink,
  Folder,
  Clock,
  Edit,
  Trash2
} from "lucide-react";
import { CardSizeSlider } from '@/components/CardSizeSlider';
import { HoverEffect } from '@/components/ui/card-hover-effect';

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState<Shortcut | undefined>(undefined);
  const [editingFolder, setEditingFolder] = useState<CustomFolder | undefined>(undefined);
  const { user } = useAuth();
  const { shortcuts, loading: shortcutsLoading, deleteShortcut } = useShortcuts();
  const { fixedLinks, loading: fixedLinksLoading } = useFixedLinks();
  const { folders, loading: foldersLoading, deleteFolder } = useCustomFolders();

  const [cardSize, setCardSize] = useState<'sm' | 'md' | 'lg'>(() => {
    return (localStorage.getItem('cardSize') as 'sm' | 'md' | 'lg') || 'md';
  });

  useEffect(() => {
    localStorage.setItem('cardSize', cardSize);
  }, [cardSize]);

  const cardWidth =
    cardSize === 'sm' ? '11rem' :
    cardSize === 'md' ? '16rem' :
    '20rem';
  const gridClass =
    cardSize === 'sm'
      ? 'grid grid-cols-6 gap-4'
      : cardSize === 'md'
      ? 'grid grid-cols-4 gap-4'
      : 'grid grid-cols-3 gap-4';

  const cardHeight =
    cardSize === 'sm' ? 'h-28' : cardSize === 'md' ? 'h-40' : 'h-60';

  const cardSquareSize =
    cardSize === 'sm' ? 'w-44 h-44' :
    cardSize === 'md' ? 'w-64 h-64' :
    'w-80 h-80';

  const isClintUser = user?.email?.endsWith('@clint.digital');

  const handleEditShortcut = (shortcut: Shortcut) => {
    setEditingShortcut(shortcut);
    setModalOpen(true);
  };

  const handleDeleteShortcut = async (id: string) => {
    if (window.confirm("Tem certeza que deseja remover este link?")) {
      await deleteShortcut(id);
    }
  };

  const handleEditFolder = (folder: CustomFolder) => {
    setEditingFolder(folder);
    setFolderModalOpen(true);
  };

  const handleDeleteFolder = async (id: string) => {
    if (window.confirm("Tem certeza que deseja remover esta pasta?")) {
      await deleteFolder(id);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingShortcut(undefined);
  };

  const closeFolderModal = () => {
    setFolderModalOpen(false);
    setEditingFolder(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - Fixed */}
      <MainNavigation 
        onNewLink={() => setModalOpen(true)} 
        onNewFolder={() => setFolderModalOpen(true)}
      />

      {/* Main Content - agora logo após a navegação */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-32">
        {/* Personal Links Section - Now First */}
        <div className="flex gap-2 items-center mb-4">
          <span className="text-xs">Layout:</span>
          <CardSizeSlider
            value={cardSize === 'sm' ? 1 : cardSize === 'md' ? 2 : 3}
            onChange={(v) => {
              const size = v === 1 ? 'sm' : v === 2 ? 'md' : 'lg';
              setCardSize(size);
              localStorage.setItem('cardSize', size);
            }}
          />
        </div>
        <CollapsibleSection
          title="Meus Links"
          icon={<User className="w-4 h-4 text-purple-500" />}
          count={shortcuts.length}
          defaultOpen={true}
          actions={
            <AceternityButton
              onClick={() => setModalOpen(true)}
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              className="hidden md:flex"
            >
              Adicionar Link
            </AceternityButton>
          }
        >
          {shortcutsLoading ? (
            <div className={gridClass}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`${cardHeight} bg-muted/20 rounded-xl animate-pulse`}
                />
              ))}
            </div>
          ) : (
            <div className={`grid ${cardSize === 'sm' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6' : cardSize === 'md' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'} gap-10 py-8 px-4 justify-items-center`}>
              {shortcuts.map((shortcut, index) => (
                <motion.div
                  key={shortcut.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <LinkCard
                    title={shortcut.title ?? ''}
                    description={shortcut.description ?? ''}
                    url={shortcut.url}
                    icon={shortcut.icon || undefined}
                    category={shortcut.category || undefined}
                    isPersonal={true}
                    onEdit={() => handleEditShortcut(shortcut)}
                    onDelete={() => handleDeleteShortcut(shortcut.id)}
                    cardSize={cardSize}
                    className="p-6 group"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </CollapsibleSection>

        {/* Custom Folders Section */}
        {folders.length > 0 && (
          <>
            {folders.map((folder) => (
              <CollapsibleSection
                key={folder.id}
                title={folder.name}
                icon={
                  folder.icon ? (
                    <span className="text-lg">{folder.icon}</span>
                  ) : (
                    <Folder className="w-4 h-4 text-purple-500" />
                  )
                }
                count={0} // TODO: Count links in this folder
                defaultOpen={false}
                actions={
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditFolder(folder)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteFolder(folder.id)}
                      className="p-1 hover:bg-muted rounded text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                }
              >
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {folder.description || "Esta pasta está vazia"}
                  </p>
                </div>
              </CollapsibleSection>
            ))}
          </>
        )}

        {/* Fixed Links Section - Now Second */}
        <CollapsibleSection
          title="Links do Sistema"
          icon={<Folder className="w-4 h-4 text-blue-500" />}
          count={fixedLinks.length}
          defaultOpen={true}
        >
          {!isClintUser ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Acesso restrito</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Faça login com um e-mail <b>@clint.digital</b> para visualizar os links do sistema.
              </p>
            </div>
          ) : fixedLinksLoading ? (
            <div className={gridClass}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`${cardHeight} bg-muted/20 rounded-xl animate-pulse`}
                />
              ))}
            </div>
          ) : (
            <div className={`grid ${cardSize === 'sm' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6' : cardSize === 'md' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'} gap-10 py-8 px-4 justify-items-center`}>
              {fixedLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <LinkCard
                    title={link.title}
                    description={link.description ?? ''}
                    url={link.url}
                    icon={link.icon || undefined}
                    category={link.category || undefined}
                    cardSize={cardSize}
                    className="p-6 group"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </CollapsibleSection>
      </main>

      {/* Modals */}
      <ShortcutModal
        isOpen={modalOpen}
        onClose={closeModal}
        shortcut={editingShortcut}
      />

      <FolderModal
        isOpen={folderModalOpen}
        onClose={closeFolderModal}
        folder={editingFolder}
      />
    </div>
  );
};

export default Dashboard;
