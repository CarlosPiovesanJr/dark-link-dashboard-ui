
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Shortcut {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  category?: string | null;
  icon?: string | null;
  user_id?: string | null;
  created_at?: string | null;
}

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

      const { data, error } = await supabase
        .from('shortcuts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setShortcuts((data || []) as Shortcut[]);
    } catch (error: any) {
      console.error('Error fetching shortcuts:', error);
      toast({
        title: "Erro ao carregar links",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createShortcut = async (shortcut: Omit<Shortcut, 'id' | 'user_id' | 'created_at'>) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('shortcuts')
        .insert([
          {
            ...shortcut,
            user_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setShortcuts(prev => [data as Shortcut, ...prev]);
      
      toast({
        title: "Link criado com sucesso!",
        description: `${shortcut.title} foi adicionado aos seus links.`,
      });

      return data;
    } catch (error: any) {
      console.error('Error creating shortcut:', error);
      toast({
        title: "Erro ao criar link",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateShortcut = async (id: string, updates: Partial<Shortcut>) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      const { data, error } = await supabase
        .from('shortcuts')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setShortcuts(prev =>
        prev.map(shortcut =>
          shortcut.id === id ? { ...shortcut, ...(data as Shortcut) } : shortcut
        )
      );

      toast({
        title: "Link atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });

      return data;
    } catch (error: any) {
      console.error('Error updating shortcut:', error);
      toast({
        title: "Erro ao atualizar link",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteShortcut = async (id: string) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      const { error } = await supabase
        .from('shortcuts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setShortcuts(prev => prev.filter(shortcut => shortcut.id !== id));
      
      toast({
        title: "Link removido",
        description: "O link foi removido da sua lista.",
      });
    } catch (error: any) {
      console.error('Error deleting shortcut:', error);
      toast({
        title: "Erro ao remover link",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchShortcuts();
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
