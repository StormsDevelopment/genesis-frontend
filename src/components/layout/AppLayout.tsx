import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Activity, 
  Trophy, 
  Users,
  Bell,
  FileText,
  Shield,
  LogOut,
  Menu,
  X,
  TrendingUp,
  ChevronDown
} from "lucide-react";
import { useRole, UserRole } from "@/contexts/RoleContext";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { role, setRole, userName, userSector } = useRole();
  const location = useLocation();

  const getRoleName = (r: UserRole) => {
    switch (r) {
      case "pmo": return "PMO - Administrador";
      case "coordinator": return "Coordenador de Setor";
      case "collaborator": return "Colaborador";
    }
  };

  const getRoleBadgeColor = (r: UserRole) => {
    switch (r) {
      case "pmo": return "bg-gradient-to-r from-gold to-warning";
      case "coordinator": return "bg-gradient-to-r from-primary to-secondary";
      case "collaborator": return "bg-accent";
    }
  };

  const navItems = [
    { path: "/dashboard", icon: Trophy, label: "Dashboard" },
    { path: "/checklists", icon: FileText, label: "Checklists" },
    { path: "/teams", icon: Users, label: "Equipes", hideFor: ["collaborator"] },
    { path: "/notifications", icon: Bell, label: "Notificações", badge: 3 },
    { path: "/reports", icon: TrendingUp, label: "Relatórios", hideFor: ["collaborator"] },
  ];

  const filteredNavItems = navItems.filter(
    item => !item.hideFor?.includes(role)
  );

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 border-r border-border bg-card flex flex-col overflow-hidden`}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">Gênesis</span>
              <p className="text-xs text-muted-foreground">Hospital Management</p>
            </div>
          </div>
          
          {/* Role Selector - For Demo */}
          <div className="mb-4">
            <label className="text-xs text-muted-foreground block mb-2">Visualizar como:</label>
            <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pmo">PMO</SelectItem>
                <SelectItem value="coordinator">Coordenador</SelectItem>
                <SelectItem value="collaborator">Colaborador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={`${getRoleBadgeColor(role)} rounded-xl p-4 text-white shadow-lg`}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-medium opacity-90">Perfil Atual</span>
            </div>
            <p className="text-sm font-bold mb-1">{getRoleName(role)}</p>
            <p className="text-xs opacity-80">{userSector}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {filteredNavItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Button 
                key={item.path}
                variant="ghost" 
                className={`w-full justify-start gap-3 h-11 ${
                  isActive 
                    ? 'bg-primary/10 text-primary hover:bg-primary/20 font-semibold' 
                    : 'hover:bg-muted'
                }`} 
                asChild
              >
                <Link to={item.path}>
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {item.badge && (
                    <Badge className="ml-auto bg-destructive text-destructive-foreground text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-muted/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold shadow-md">
              {getInitials(userName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{userSector}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link to="/notifications">
                <Bell className="w-4 h-4" />
                <Badge className="bg-destructive text-destructive-foreground px-1.5 py-0 text-xs">3</Badge>
              </Link>
            </Button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold shadow-md">
              {getInitials(userName)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
