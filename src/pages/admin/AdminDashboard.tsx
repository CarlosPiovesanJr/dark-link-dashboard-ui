
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AceternityCard } from "@/components/ui/aceternity-card";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { 
  Settings, 
  Link as LinkIcon, 
  Users, 
  BarChart3, 
  Shield,
  ArrowRight,
  Database,
  Cog
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const adminCards = [
    {
      title: "Links Fixos",
      description: "Gerencie os links que aparecem para todos os usuários",
      icon: <LinkIcon className="w-6 h-6" />,
      path: "/admin/fixed-links",
      color: "purple",
      stats: "4 links ativos"
    },
    {
      title: "Usuários",
      description: "Visualize e gerencie usuários do sistema",
      icon: <Users className="w-6 h-6" />,
      path: "/admin/users",
      color: "blue",
      stats: "12 usuários"
    },
    {
      title: "Relatórios",
      description: "Analise métricas e estatísticas de uso",
      icon: <BarChart3 className="w-6 h-6" />,
      path: "/admin/reports",
      color: "green",
      stats: "Ver estatísticas"
    },
    {
      title: "Configurações",
      description: "Configure parâmetros gerais do sistema",
      icon: <Cog className="w-6 h-6" />,
      path: "/admin/settings",
      color: "purple",
      stats: "Sistema"
    }
  ];

  const systemStats = [
    { label: "Links Totais", value: "16", icon: <LinkIcon className="w-4 h-4" /> },
    { label: "Usuários Ativos", value: "12", icon: <Users className="w-4 h-4" /> },
    { label: "Acessos Hoje", value: "48", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Uptime", value: "99.9%", icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <AdminLayout 
      title="Painel Administrativo" 
      description="Gerencie todos os aspectos do LinkBoard UI"
    >
      {/* System Stats */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          Estatísticas do Sistema
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <AceternityCard className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    {stat.icon}
                  </div>
                </div>
              </AceternityCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Admin Functions */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-500" />
          Funções Administrativas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {adminCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <AceternityCard className="p-6 group hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      card.color === 'purple' ? 'bg-purple-500/10 text-purple-500' :
                      card.color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                      card.color === 'green' ? 'bg-green-500/10 text-green-500' :
                      'bg-purple-500/10 text-purple-500'
                    }`}>
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-purple-500 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {card.stats}
                      </p>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {card.description}
                </p>
                
                <Link to={card.path}>
                  <AceternityButton
                    size="sm"
                    variant="outline"
                    className="w-full"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Acessar
                  </AceternityButton>
                </Link>
              </AceternityCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <AceternityCard className="p-6 bg-gradient-to-r from-purple-500/5 to-blue-500/5 border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Ações Rápidas</h4>
              <p className="text-sm text-muted-foreground">
                Acesso direto às funcionalidades mais utilizadas
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/admin/fixed-links">
                <AceternityButton
                  size="sm"
                  icon={<LinkIcon className="w-4 h-4" />}
                >
                  Gerenciar Links
                </AceternityButton>
              </Link>
              <Link to="/">
                <AceternityButton
                  size="sm"
                  variant="outline"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Ver Dashboard
                </AceternityButton>
              </Link>
            </div>
          </div>
        </AceternityCard>
      </motion.section>
    </AdminLayout>
  );
};

export default AdminDashboard;
