import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Trophy, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Users,
  Bell,
  Plus,
  FileText,
  Shield,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { RankingTable } from "@/components/dashboard/RankingTable";
import { ChecklistManager } from "@/components/dashboard/ChecklistManager";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { TeamManager } from "@/components/dashboard/TeamManager";

type UserRole = "pmo" | "coordinator" | "collaborator";

const Dashboard = () => {
  const [userRole] = useState<UserRole>("pmo"); // Mock role, would come from auth
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getRoleName = (role: UserRole) => {
    switch (role) {
      case "pmo": return "PMO - Administrator";
      case "coordinator": return "Coordenador - Cardiologia";
      case "collaborator": return "Colaborador";
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "pmo": return "bg-gradient-to-r from-primary to-secondary";
      case "coordinator": return "bg-secondary";
      case "collaborator": return "bg-accent";
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 border-r border-border bg-card flex flex-col overflow-hidden`}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Gênesis</span>
          </div>
          <div className={`${getRoleBadgeColor(userRole)} rounded-lg p-3 text-white`}>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-medium opacity-90">Perfil</span>
            </div>
            <p className="text-sm font-semibold">{getRoleName(userRole)}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2 bg-primary/10 text-primary hover:bg-primary/20" asChild>
            <Link to="/dashboard">
              <Trophy className="w-4 h-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link to="/checklists">
              <FileText className="w-4 h-4" />
              Checklists
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link to="/teams">
              <Users className="w-4 h-4" />
              Equipes
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 relative" asChild>
            <Link to="/notifications">
              <Bell className="w-4 h-4" />
              Notificações
              <Badge className="ml-auto bg-destructive text-destructive-foreground">3</Badge>
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link to="/reports">
              <TrendingUp className="w-4 h-4" />
              Relatórios
            </Link>
          </Button>
        </nav>

        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Visão geral do sistema</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="w-4 h-4" />
              <Badge className="bg-destructive text-destructive-foreground px-1.5 py-0 text-xs">3</Badge>
            </Button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
              JD
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          {userRole === "pmo" && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ScoreCard
                  title="Total de Setores"
                  value="12"
                  icon={Users}
                  trend="+2 este mês"
                  variant="default"
                />
                <ScoreCard
                  title="Atividades Validadas"
                  value="1,247"
                  icon={CheckCircle2}
                  trend="+18% vs mês anterior"
                  variant="success"
                />
                <ScoreCard
                  title="Notificações Ativas"
                  value="23"
                  icon={AlertCircle}
                  trend="5 pendentes de julgamento"
                  variant="warning"
                />
                <ScoreCard
                  title="Pontos Totais"
                  value="45,890"
                  icon={Trophy}
                  trend="+3,200 esta semana"
                  variant="primary"
                />
              </div>

              {/* Main Content Tabs */}
              <Tabs defaultValue="ranking" className="space-y-4">
                <TabsList className="bg-muted">
                  <TabsTrigger value="ranking">Ranking de Setores</TabsTrigger>
                  <TabsTrigger value="notifications">Notificações</TabsTrigger>
                  <TabsTrigger value="activity">Atividade Recente</TabsTrigger>
                </TabsList>

                <TabsContent value="ranking" className="space-y-4">
                  <RankingTable />
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <NotificationPanel role="pmo" />
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <ActivityFeed />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {userRole === "coordinator" && (
            <div className="space-y-6">
              {/* Coordinator Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ScoreCard
                  title="Score do Setor"
                  value="3,845"
                  icon={Trophy}
                  trend="2º lugar no ranking"
                  variant="primary"
                />
                <ScoreCard
                  title="Atividades Pendentes"
                  value="8"
                  icon={FileText}
                  trend="2 vencendo hoje"
                  variant="warning"
                />
                <ScoreCard
                  title="Membros da Equipe"
                  value="15"
                  icon={Users}
                  trend="12 ativos"
                  variant="default"
                />
                <ScoreCard
                  title="Taxa de Conclusão"
                  value="94%"
                  icon={TrendingUp}
                  trend="+5% esta semana"
                  variant="success"
                />
              </div>

              {/* Coordinator Tabs */}
              <Tabs defaultValue="checklist" className="space-y-4">
                <TabsList className="bg-muted">
                  <TabsTrigger value="checklist">Checklist do Setor</TabsTrigger>
                  <TabsTrigger value="team">Equipe</TabsTrigger>
                  <TabsTrigger value="notifications">Notificações</TabsTrigger>
                </TabsList>

                <TabsContent value="checklist" className="space-y-4">
                  <ChecklistManager role="coordinator" />
                </TabsContent>

                <TabsContent value="team" className="space-y-4">
                  <TeamManager />
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <NotificationPanel role="coordinator" />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {userRole === "collaborator" && (
            <div className="space-y-6">
              {/* Collaborator Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ScoreCard
                  title="Minhas Atividades"
                  value="12"
                  icon={FileText}
                  trend="3 pendentes hoje"
                  variant="default"
                />
                <ScoreCard
                  title="Atividades Concluídas"
                  value="127"
                  icon={CheckCircle2}
                  trend="Este mês: 28"
                  variant="success"
                />
                <ScoreCard
                  title="Pontos Ganhos"
                  value="1,270"
                  icon={Trophy}
                  trend="+120 esta semana"
                  variant="primary"
                />
              </div>

              {/* Collaborator Checklist */}
              <ChecklistManager role="collaborator" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
