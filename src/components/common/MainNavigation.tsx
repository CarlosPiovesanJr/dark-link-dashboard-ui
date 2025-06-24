import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { ThemeToggle } from "./ThemeToggle";
import { AceternityButton } from "@/components/ui/aceternity-button";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, 
  LogOut, 
  Settings,
  Shield,
  Plus,
  Home,
  FolderPlus
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface MainNavigationProps {
  onNewLink?: () => void;
  onNewFolder?: () => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ onNewLink, onNewFolder }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin
  const isAdmin = user?.email === 'admin@linkboard.com' || user?.email?.includes('admin');

  const navItems = [
    {
      name: "Dashboard",
      link: "/",
      icon: <Home className="w-4 h-4" />,
      onClick: () => navigate("/")
    },
    {
      name: "Novo Link",
      link: "#",
      icon: <Plus className="w-4 h-4" />,
      onClick: onNewLink
    },
    {
      name: "Nova Pasta",
      link: "#",
      icon: <FolderPlus className="w-4 h-4" />,
      onClick: onNewFolder
    },
    ...(isAdmin ? [{
      name: "Admin",
      link: "/admin",
      icon: <Shield className="w-4 h-4" />,
      onClick: () => navigate("/admin")
    }] : []),
  ];

  const rightElement = (
    <div className="flex items-center space-x-2">
      <ThemeToggle />
      
      <div className="w-px h-6 bg-border" />
      
      <div className="flex items-center space-x-1">
        <span className="text-xs text-muted-foreground hidden md:block">
          {user?.email?.split('@')[0]}
        </span>
        {user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
          <img
            src={user.user_metadata.avatar_url || user.user_metadata.picture}
            alt="Avatar"
            className="w-7 h-7 rounded-full object-cover border border-border"
          />
        ) : (
          <User className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
      
      <AceternityButton
        variant="ghost"
        size="sm"
        onClick={signOut}
        className="px-3 py-1 h-8"
      >
        <LogOut className="w-3 h-3" />
      </AceternityButton>
    </div>
  );

  return (
    <FloatingNav 
      navItems={navItems} 
      rightElement={rightElement}
      alwaysVisible={true}
      className="bg-card/90 backdrop-blur-xl border-purple-500/20"
    />
  );
};
