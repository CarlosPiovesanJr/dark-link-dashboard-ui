
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
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchFixedLinks = async () => {
    try {
      setLoading(true);
      
      // For now, we'll use a local array. In production, this would come from a database
      const defaultLinks = [
        {
          id: "supabase",
          title: "Supabase Dashboard",
          description: "Gerenciar banco de dados e autenticação",
          url: "https://supabase.com/dashboard",
          icon: "🗄️",
          category: "Desenvolvimento"
        },
        {
          id: "docs",
          title: "Documentação",
          description: "Guias e tutoriais do sistema",
          url: "https://docs.supabase.com",
          icon: "📚",
          category: "Referência"
        },
        {
          id: "monitoring",
          title: "Monitoramento",
          description: "Status e métricas do sistema",
          url: "https://status.supabase.com",
          icon: "📊",
          category: "Operações"
        },
        {
          id: "github",
          title: "Repositório",
          description: "Código fonte do projeto",
          url: "https://github.com",
          icon: "💻",
          category: "Desenvolvimento"
        },
      ];

      setFixedLinks(defaultLinks);
    } catch (error: any) {
      console.error('Error fetching fixed links:', error);
      toast({
        title: "Erro ao carregar links fixos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createFixedLink = async (link: Omit<FixedLink, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newLink: FixedLink = {
        ...link,
        id: `fixed-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setFixedLinks(prev => [newLink, ...prev]);
      
      toast({
        title: "Link fixo criado!",
        description: `${link.title} foi adicionado aos links fixos.`,
      });

      return newLink;
    } catch (error: any) {
      console.error('Error creating fixed link:', error);
      toast({
        title: "Erro ao criar link fixo",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateFixedLink = async (id: string, updates: Partial<FixedLink>) => {
    try {
      const updatedLink = {
        ...updates,
        id,
        updated_at: new Date().toISOString(),
      };

      setFixedLinks(prev => 
        prev.map(link => 
          link.id === id ? { ...link, ...updatedLink } : link
        )
      );

      toast({
        title: "Link fixo atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });

      return updatedLink;
    } catch (error: any) {
      console.error('Error updating fixed link:', error);
      toast({
        title: "Erro ao atualizar link fixo",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteFixedLink = async (id: string) => {
    try {
      setFixedLinks(prev => prev.filter(link => link.id !== id));
      
      toast({
        title: "Link fixo removido",
        description: "O link foi removido da lista.",
      });
    } catch (error: any) {
      console.error('Error deleting fixed link:', error);
      toast({
        title: "Erro ao remover link fixo",
        description: error.message,
        variant: "destructive",
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
