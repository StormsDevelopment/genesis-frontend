import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Users,
  Plus,
  FileText,
  Trophy,
  Gavel,
  Target,
  Award
} from "lucide-react";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { RankingTable } from "@/components/dashboard/RankingTable";
import { ChecklistManager } from "@/components/dashboard/ChecklistManager";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { TeamManager } from "@/components/dashboard/TeamManager";
import { AppLayout } from "@/components/layout/AppLayout";
import { useRole } from "@/contexts/RoleContext";

const Dashboard = () => {
  const { role, userSector, rolePermissions } = useRole();

  const getSubtitle = () => {
    switch (role) {
      case "pmo": return "Visão geral de todos os setores";
      case "coordinator": return `Gestão do setor ${userSector}`;
      case "collaborator": return "Suas atividades e tarefas";
    }
  };

  return (
    <AppLayout title="Dashboard" subtitle={getSubtitle()}>
      <div className="p-6">
        {/* PMO Dashboard */}
        {role === "pmo" && (
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
                title="Disputas Pendentes"
                value="5"
                icon={Gavel}
                trend="Aguardando julgamento"
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

            {/* Quick Actions for PMO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border-dashed border-2 hover:border-primary/50 cursor-pointer transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Validar Atividades</p>
                    <p className="text-sm text-muted-foreground">8 atividades pendentes</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-dashed border-2 hover:border-warning/50 cursor-pointer transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-warning/10 group-hover:bg-warning/20 transition-colors">
                    <Gavel className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Julgar Disputas</p>
                    <p className="text-sm text-muted-foreground">5 disputas abertas</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-dashed border-2 hover:border-success/50 cursor-pointer transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
                    <Users className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Gerenciar Setores</p>
                    <p className="text-sm text-muted-foreground">12 setores ativos</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="ranking" className="space-y-4">
              <TabsList className="bg-muted">
                <TabsTrigger value="ranking">Ranking de Setores</TabsTrigger>
                <TabsTrigger value="disputes">Disputas Pendentes</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
                <TabsTrigger value="activity">Atividade Recente</TabsTrigger>
              </TabsList>

              <TabsContent value="ranking" className="space-y-4">
                <RankingTable />
              </TabsContent>

              <TabsContent value="disputes" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Gavel className="w-5 h-5 text-warning" />
                    Disputas Aguardando Julgamento
                  </h3>
                  <div className="space-y-4">
                    {[
                      { id: 1, reporter: "UTI", reported: "Laboratório", type: "Alerta", description: "Atraso na entrega de exames", date: "2025-12-15" },
                      { id: 2, reporter: "Cardiologia", reported: "Farmácia", type: "Ausência", description: "Medicamento não disponível no horário", date: "2025-12-14" },
                      { id: 3, reporter: "Emergência", reported: "Radiologia", type: "Alerta", description: "Resultado de raio-x atrasado", date: "2025-12-14" },
                    ].map(dispute => (
                      <div key={dispute.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-warning/50 transition-all">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{dispute.reporter}</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="font-semibold text-foreground">{dispute.reported}</span>
                            <Badge variant="outline" className={
                              dispute.type === "Alerta" ? "bg-warning/10 text-warning border-warning/30" :
                              dispute.type === "Ausência" ? "bg-destructive/10 text-destructive border-destructive/30" :
                              "bg-muted text-muted-foreground"
                            }>
                              {dispute.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{dispute.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{new Date(dispute.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-success border-success/30 hover:bg-success/10">
                            Aprovar
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                            Rejeitar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
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

        {/* Coordinator Dashboard */}
        {role === "coordinator" && (
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

            {/* Quick Actions for Coordinator */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border-dashed border-2 hover:border-primary/50 cursor-pointer transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Nova Atividade</p>
                    <p className="text-sm text-muted-foreground">Adicionar ao checklist (+100 pts)</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-dashed border-2 hover:border-destructive/50 cursor-pointer transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Reportar Erro</p>
                    <p className="text-sm text-muted-foreground">Notificar outro setor (+50 pts)</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-dashed border-2 hover:border-success/50 cursor-pointer transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
                    <Users className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Gerenciar Equipe</p>
                    <p className="text-sm text-muted-foreground">15 colaboradores</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Coordinator Tabs */}
            <Tabs defaultValue="checklist" className="space-y-4">
              <TabsList className="bg-muted">
                <TabsTrigger value="checklist">Checklist do Setor</TabsTrigger>
                <TabsTrigger value="team">Equipe</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
                <TabsTrigger value="pendencies">Pendências</TabsTrigger>
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

              <TabsContent value="pendencies" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-warning" />
                    Pendências do Setor
                  </h3>
                  <div className="space-y-4">
                    {[
                      { id: 1, type: "vital", description: "Adicionar 'Verificação de bombas de infusão' ao checklist", points: "+100", source: "Pontos Vitais" },
                      { id: 2, type: "absence", description: "Incluir 'Conferência de medicamentos' no checklist", points: "-100", source: "Notificação de Ausência" },
                    ].map(pendency => (
                      <div key={pendency.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className={
                              pendency.type === "vital" ? "bg-success/10 text-success border-success/30" :
                              "bg-destructive/10 text-destructive border-destructive/30"
                            }>
                              {pendency.source}
                            </Badge>
                            <Badge variant="outline" className={
                              pendency.points.startsWith("+") ? "bg-success/10 text-success border-success/30" :
                              "bg-destructive/10 text-destructive border-destructive/30"
                            }>
                              {pendency.points}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground">{pendency.description}</p>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Resolver
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Collaborator Dashboard */}
        {role === "collaborator" && (
          <div className="space-y-6">
            {/* Collaborator Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ScoreCard
                title="Minhas Atividades"
                value="12"
                icon={FileText}
                trend="3 pendentes hoje"
                variant="default"
              />
              <ScoreCard
                title="Concluídas Hoje"
                value="5"
                icon={CheckCircle2}
                trend="+50 pontos"
                variant="success"
              />
              <ScoreCard
                title="Meus Pontos"
                value="1,270"
                icon={Award}
                trend="+120 esta semana"
                variant="primary"
              />
              <ScoreCard
                title="Taxa de Conclusão"
                value="94%"
                icon={TrendingUp}
                trend="Excelente!"
                variant="success"
              />
            </div>

            {/* Quick Actions for Collaborator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-dashed border-2 hover:border-destructive/50 cursor-pointer transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Reportar Erro</p>
                    <p className="text-sm text-muted-foreground">Notificar outro setor (+50 pts)</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-dashed border-2 hover:border-gold/50 cursor-pointer transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-colors">
                    <Trophy className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Ver Ranking</p>
                    <p className="text-sm text-muted-foreground">Posição atual: 5º lugar</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Collaborator Checklist */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Meu Checklist de Hoje
                </h3>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  5/12 concluídas
                </Badge>
              </div>
              <ChecklistManager role="collaborator" />
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
