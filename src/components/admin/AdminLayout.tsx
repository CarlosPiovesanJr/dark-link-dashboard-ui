
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { 
  Settings,
  LogOut, 
  User, 
  ArrowLeft,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Voltar ao Dashboard</span>
              </Link>
              
              <div className="w-px h-6 bg-border" />
              
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Shield className="w-4 h-4 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-lg font-semibold flex items-center gap-2">
                    <span>Administração</span>
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    LinkBoard UI Admin Panel
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                {user?.email}
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-purple-500" />
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="flex-1 border-t border-border" />
          </div>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </motion.div>

        {children}
      </main>
    </div>
  );
};
