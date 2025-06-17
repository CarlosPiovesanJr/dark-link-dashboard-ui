
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
  Home
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface MainNavigationProps {
  onNewLink?: () => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ onNewLink }) => {
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
        <User className="w-4 h-4 text-muted-foreground" />
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
      className="bg-card/90 backdrop-blur-xl border-orange-500/20"
    />
  );
};
