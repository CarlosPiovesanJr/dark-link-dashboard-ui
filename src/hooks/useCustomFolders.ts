
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface CustomFolder {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  user_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export const useCustomFolders = () => {
  const [folders, setFolders] = useState<CustomFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchFolders = async () => {
    try {
      setLoading(true);
      
      if (!user) {
        setFolders([]);
        return;
      }

      // Por enquanto, vamos usar um array local. Em produção, isso viria de um banco de dados
      const localFolders = JSON.parse(localStorage.getItem(`custom-folders-${user.id}`) || '[]');
      setFolders(localFolders);
    } catch (error: any) {
      console.error('Error fetching custom folders:', error);
      toast({
        title: "Erro ao carregar pastas",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createFolder = async (folder: Omit<CustomFolder, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');

      const newFolder: CustomFolder = {
        ...folder,
        id: `folder-${Date.now()}`,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const updatedFolders = [newFolder, ...folders];
      setFolders(updatedFolders);
      localStorage.setItem(`custom-folders-${user.id}`, JSON.stringify(updatedFolders));
      
      toast({
        title: "Pasta criada com sucesso!",
        description: `${folder.name} foi adicionada às suas pastas.`,
      });

      return newFolder;
    } catch (error: any) {
      console.error('Error creating folder:', error);
      toast({
        title: "Erro ao criar pasta",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateFolder = async (id: string, updates: Partial<CustomFolder>) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      
      const updatedFolders = folders.map(folder =>
        folder.id === id ? { ...folder, ...updates, updated_at: new Date().toISOString() } : folder
      );
      
      setFolders(updatedFolders);
      localStorage.setItem(`custom-folders-${user.id}`, JSON.stringify(updatedFolders));

      toast({
        title: "Pasta atualizada!",
        description: "As alterações foram salvas com sucesso.",
      });

      return updatedFolders.find(f => f.id === id);
    } catch (error: any) {
      console.error('Error updating folder:', error);
      toast({
        title: "Erro ao atualizar pasta",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteFolder = async (id: string) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      
      const updatedFolders = folders.filter(folder => folder.id !== id);
      setFolders(updatedFolders);
      localStorage.setItem(`custom-folders-${user.id}`, JSON.stringify(updatedFolders));
      
      toast({
        title: "Pasta removida",
        description: "A pasta foi removida da sua lista.",
      });
    } catch (error: any) {
      console.error('Error deleting folder:', error);
      toast({
        title: "Erro ao remover pasta",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [user]);

  return {
    folders,
    loading,
    createFolder,
    updateFolder,
    deleteFolder,
    refetch: fetchFolders,
  };
};
