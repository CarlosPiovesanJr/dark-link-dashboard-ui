import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import type { Database } from '@/integrations/supabase/types';

export type Shortcut = Database['public']['Tables']['links']['Row'];
export type ShortcutInsert = Database['public']['Tables']['links']['Insert'];
export type ShortcutUpdate = Database['public']['Tables']['links']['Update'];

export const useShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchShortcuts = async () => {
    try {
      setLoading(true);
      if (!user) {
        setShortcuts([]);
        return;
      }
      // Busca apenas links que não estão em pastas (folder_id null)
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', user.id)
        .is('folder_id', null)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setShortcuts(data || []);
    } catch (error: any) {
      console.error('Error fetching shortcuts:', error);
      toast({
        title: 'Erro ao carregar links',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createShortcut = async (shortcut: Omit<ShortcutInsert, 'id' | 'created_at'>) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      const { data, error } = await supabase
        .from('links')
        .insert([{ ...shortcut, user_id: user.id }])
        .select()
        .single();
      if (error) throw error;
      setShortcuts(prev => [data, ...prev]);
      toast({
        title: 'Link criado com sucesso!',
        description: `${shortcut.title || 'Link'} foi adicionado aos seus links.`,
      });
      return data;
    } catch (error: any) {
      console.error('Error creating shortcut:', error);
      toast({
        title: 'Erro ao criar link',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateShortcut = async (id: string, updates: ShortcutUpdate) => {
    try {
      const { data, error } = await supabase
        .from('links')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      setShortcuts(prev =>
        prev.map(shortcut =>
          shortcut.id === id ? data : shortcut
        )
      );
      toast({
        title: 'Link atualizado!',
        description: 'As alterações foram salvas com sucesso.',
      });
      return data;
    } catch (error: any) {
      console.error('Error updating shortcut:', error);
      toast({
        title: 'Erro ao atualizar link',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteShortcut = async (id: string) => {
    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setShortcuts(prev => prev.filter(shortcut => shortcut.id !== id));
      toast({
        title: 'Link removido',
        description: 'O link foi removido da sua lista.',
      });
    } catch (error: any) {
      console.error('Error deleting shortcut:', error);
      toast({
        title: 'Erro ao remover link',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchShortcuts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    shortcuts,
    loading,
    createShortcut,
    updateShortcut,
    deleteShortcut,
    refetch: fetchShortcuts,
  };
};
