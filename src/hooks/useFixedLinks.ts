import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface FixedLink {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  category?: string | null;
  icon?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export const useFixedLinks = () => {
  const [fixedLinks, setFixedLinks] = useState<FixedLink[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFixedLinks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('fixed_links')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setFixedLinks(data || []);
    } catch (error: any) {
      console.error('Error fetching fixed links:', error);
      toast({
        title: 'Erro ao carregar links fixos',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createFixedLink = async (link: Omit<FixedLink, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('fixed_links')
        .insert([{ ...link }])
        .select()
        .single();
      if (error) throw error;
      setFixedLinks(prev => [data, ...prev]);
      toast({
        title: 'Link fixo criado!',
        description: `${link.title} foi adicionado aos links fixos.`,
      });
      return data;
    } catch (error: any) {
      console.error('Error creating fixed link:', error);
      toast({
        title: 'Erro ao criar link fixo',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateFixedLink = async (id: string, updates: Partial<FixedLink>) => {
    try {
      const { data, error } = await supabase
        .from('fixed_links')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      setFixedLinks(prev => prev.map(link => link.id === id ? { ...link, ...data } : link));
      toast({
        title: 'Link fixo atualizado!',
        description: 'As alterações foram salvas com sucesso.',
      });
      return data;
    } catch (error: any) {
      console.error('Error updating fixed link:', error);
      toast({
        title: 'Erro ao atualizar link fixo',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteFixedLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('fixed_links')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setFixedLinks(prev => prev.filter(link => link.id !== id));
      toast({
        title: 'Link fixo removido',
        description: 'O link foi removido da lista.',
      });
    } catch (error: any) {
      console.error('Error deleting fixed link:', error);
      toast({
        title: 'Erro ao remover link fixo',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchFixedLinks();
  }, []);

  return {
    fixedLinks,
    loading,
    createFixedLink,
    updateFixedLink,
    deleteFixedLink,
    refetch: fetchFixedLinks,
  };
};
