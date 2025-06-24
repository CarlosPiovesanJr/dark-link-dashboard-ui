import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import type { Database } from '@/integrations/supabase/types';

export type CustomFolder = Database['public']['Tables']['folders']['Row'];
export type CustomFolderInsert = Database['public']['Tables']['folders']['Insert'];
export type CustomFolderUpdate = Database['public']['Tables']['folders']['Update'];

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
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setFolders(data || []);
    } catch (error: any) {
      console.error('Error fetching custom folders:', error);
      toast({
        title: 'Erro ao carregar pastas',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createFolder = async (folder: Omit<CustomFolderInsert, 'user_id' | 'created_at' | 'id'>) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      const { data, error } = await supabase
        .from('folders')
        .insert([{ ...folder, user_id: user.id }])
        .select()
        .single();
      if (error) throw error;
      setFolders((prev) => [data, ...prev]);
      toast({
        title: 'Pasta criada com sucesso!',
        description: `${folder.name} foi adicionada às suas pastas.`,
      });
      return data;
    } catch (error: any) {
      console.error('Error creating folder:', error);
      toast({
        title: 'Erro ao criar pasta',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateFolder = async (id: string, updates: CustomFolderUpdate) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      const { data, error } = await supabase
        .from('folders')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();
      if (error) throw error;
      setFolders((prev) => prev.map((folder) => (folder.id === id ? data : folder)));
      toast({
        title: 'Pasta atualizada!',
        description: 'As alterações foram salvas com sucesso.',
      });
      return data;
    } catch (error: any) {
      console.error('Error updating folder:', error);
      toast({
        title: 'Erro ao atualizar pasta',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteFolder = async (id: string) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      const { error } = await supabase
        .from('folders')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      if (error) throw error;
      setFolders((prev) => prev.filter((folder) => folder.id !== id));
      toast({
        title: 'Pasta removida',
        description: 'A pasta foi removida da sua lista.',
      });
    } catch (error: any) {
      console.error('Error deleting folder:', error);
      toast({
        title: 'Erro ao remover pasta',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
