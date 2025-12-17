import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Award,
  BarChart3,
  Calendar,
  Filter,
  FileText,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useRole } from "@/contexts/RoleContext";

export default function Reports() {
  const { role, userSector } = useRole();

  const getSubtitle = () => {
    switch (role) {
      case "pmo": return "Análises e insights de todos os setores";
      case "coordinator": return `Relatórios do setor ${userSector}`;
      default: return "Seus relatórios de desempenho";
    }
  };

  // Mock data for scoring breakdown
  const scoringBreakdown = [
    { action: "Atividades Validadas", count: 127, points: 1270, type: "positive" },
    { action: "Pontos Vitais (Novas Atividades)", count: 3, points: 300, type: "positive" },
    { action: "Pontos de Auditoria", count: 5, points: 250, type: "positive" },
    { action: "Notificações de Alerta", count: 2, points: -100, type: "negative" },
    { action: "Notificações de Ausência", count: 1, points: -100, type: "negative" },
  ];

  const totalPositive = scoringBreakdown.filter(s => s.type === "positive").reduce((acc, s) => acc + s.points, 0);
  const totalNegative = scoringBreakdown.filter(s => s.type === "negative").reduce((acc, s) => acc + s.points, 0);
  const totalScore = totalPositive + totalNegative;

  return (
    <AppLayout title="Relatórios" subtitle={getSubtitle()}>
      <div className="p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Período
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4" />
            Exportar Relatório
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <Badge variant="outline" className="gap-1 text-success border-success/30">
                <TrendingUp className="w-3 h-3" />
                +12%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Tarefas Concluídas</p>
            <p className="text-3xl font-bold text-foreground">
              {role === "pmo" ? "1,247" : role === "coordinator" ? "127" : "28"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">vs. mês anterior</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Activity className="w-5 h-5 text-success" />
              </div>
              <Badge variant="outline" className="gap-1 text-success border-success/30">
                <TrendingUp className="w-3 h-3" />
                +8%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Taxa de Conclusão</p>
            <p className="text-3xl font-bold text-foreground">94.2%</p>
            <p className="text-xs text-muted-foreground mt-1">vs. mês anterior</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <Award className="w-5 h-5 text-gold" />
              </div>
              <Badge variant="outline" className="gap-1 text-success border-success/30">
                <TrendingUp className="w-3 h-3" />
                +15%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Pontos Totais</p>
            <p className="text-3xl font-bold text-foreground">
              {role === "pmo" ? "45,890" : role === "coordinator" ? "3,845" : "1,270"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">vs. mês anterior</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <BarChart3 className="w-5 h-5 text-destructive" />
              </div>
              <Badge variant="outline" className="gap-1 text-destructive border-destructive/30">
                <TrendingDown className="w-3 h-3" />
                -5%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Erros Reportados</p>
            <p className="text-3xl font-bold text-foreground">
              {role === "pmo" ? "23" : role === "coordinator" ? "3" : "0"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">vs. mês anterior</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="scoring">
          <TabsList>
            <TabsTrigger value="scoring">Detalhamento de Pontos</TabsTrigger>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            {role === "pmo" && <TabsTrigger value="sectors">Por Setor</TabsTrigger>}
            <TabsTrigger value="pendencies">Pendências</TabsTrigger>
          </TabsList>

          {/* Scoring Breakdown Tab */}
          <TabsContent value="scoring" className="mt-6 space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                Detalhamento da Pontuação
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Veja como seus pontos são calculados com base nas regras de gamificação.
              </p>
              
              <div className="space-y-4">
                {scoringBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${item.type === "positive" ? "bg-success/10" : "bg-destructive/10"}`}>
                        {item.type === "positive" ? (
                          <CheckCircle2 className={`w-5 h-5 text-success`} />
                        ) : (
                          <AlertCircle className={`w-5 h-5 text-destructive`} />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.action}</p>
                        <p className="text-sm text-muted-foreground">{item.count} ocorrências</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={
                      item.type === "positive" 
                        ? "bg-success/10 text-success border-success/30 text-lg font-bold px-3 py-1"
                        : "bg-destructive/10 text-destructive border-destructive/30 text-lg font-bold px-3 py-1"
                    }>
                      {item.points > 0 ? `+${item.points}` : item.points} pts
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-success/10">
                    <p className="text-sm text-muted-foreground mb-1">Pontos Ganhos</p>
                    <p className="text-2xl font-bold text-success">+{totalPositive}</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-destructive/10">
                    <p className="text-sm text-muted-foreground mb-1">Pontos Perdidos</p>
                    <p className="text-2xl font-bold text-destructive">{totalNegative}</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <p className="text-sm text-muted-foreground mb-1">Saldo Total</p>
                    <p className="text-2xl font-bold text-primary">{totalScore}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Scoring Rules Reference */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Tabela de Referência de Pontuação
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 text-sm font-semibold text-foreground">Ação</th>
                      <th className="text-center p-3 text-sm font-semibold text-foreground">Pontos</th>
                      <th className="text-left p-3 text-sm font-semibold text-foreground">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-3 text-sm">Atividade Validada</td>
                      <td className="p-3 text-center">
                        <Badge className="bg-success/10 text-success border-success/30">+10</Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">Conclusão de atividade do processo</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 text-sm">Pontos Vitais</td>
                      <td className="p-3 text-center">
                        <Badge className="bg-success/10 text-success border-success/30">+100</Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">Nova atividade adicionada ao checklist</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 text-sm">Pontos de Auditoria</td>
                      <td className="p-3 text-center">
                        <Badge className="bg-success/10 text-success border-success/30">+50</Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">Notificação de erro em outro setor</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 text-sm">Notificação de Alerta</td>
                      <td className="p-3 text-center">
                        <Badge className="bg-warning/10 text-warning border-warning/30">-50</Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">Erro já estava no checklist</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 text-sm">Notificação de Ausência</td>
                      <td className="p-3 text-center">
                        <Badge className="bg-destructive/10 text-destructive border-destructive/30">-100</Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">Erro não estava no checklist (gera pendência)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-sm">Notificação de Agravamento</td>
                      <td className="p-3 text-center">
                        <Badge className="bg-destructive/10 text-destructive border-destructive/30">-150</Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">Erro recorrente (3ª notificação em 30 dias)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Performance Chart */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Desempenho Mensal</h3>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg border border-border">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Gráfico de desempenho mensal</p>
                </div>
              </div>
            </Card>

            {/* Top Sectors - PMO Only */}
            {role === "pmo" && (
              <Card className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Top 5 Setores</h3>
                <div className="space-y-3">
                  {[
                    { sector: "Cardiologia", points: 3845, tasks: 127, rate: 96 },
                    { sector: "UTI", points: 3720, tasks: 115, rate: 94 },
                    { sector: "Emergência", points: 3580, tasks: 142, rate: 91 },
                    { sector: "Pediatria", points: 3420, tasks: 98, rate: 95 },
                    { sector: "Ortopedia", points: 3210, tasks: 89, rate: 93 },
                  ].map((sector, index) => (
                    <div key={sector.sector} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? "bg-gradient-to-r from-gold to-warning text-gold-foreground" :
                        index === 1 ? "bg-gradient-to-r from-muted to-border text-foreground" :
                        "bg-muted text-foreground"
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{sector.sector}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{sector.tasks} tarefas</span>
                          <span>{sector.rate}% conclusão</span>
                        </div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/30 font-bold">
                        {sector.points} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          {role === "pmo" && (
            <TabsContent value="sectors" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Análise por Setor</h3>
                <div className="h-96 flex items-center justify-center bg-muted/30 rounded-lg border border-border">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Relatório detalhado por setor</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="pendencies" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                Relatório de Pendências
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Pendências são geradas quando o setor ganha Pontos Vitais (+100) ou é notificado por Ausência (-100).
              </p>
              <div className="space-y-4">
                {[
                  { id: 1, type: "vital", description: "Adicionar 'Verificação de bombas de infusão' ao checklist", source: "Pontos Vitais (+100)", date: "2025-12-15", status: "pending" },
                  { id: 2, type: "absence", description: "Incluir 'Conferência de medicamentos de alto risco' no checklist", source: "Notificação de Ausência (-100)", date: "2025-12-14", status: "pending" },
                  { id: 3, type: "vital", description: "Adicionar 'Checagem de temperatura dos refrigeradores' ao checklist", source: "Pontos Vitais (+100)", date: "2025-12-10", status: "resolved" },
                ].map(pendency => (
                  <div key={pendency.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                    pendency.status === "resolved" ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5"
                  }`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={
                          pendency.type === "vital" 
                            ? "bg-success/10 text-success border-success/30"
                            : "bg-destructive/10 text-destructive border-destructive/30"
                        }>
                          {pendency.source}
                        </Badge>
                        <Badge variant="outline" className={
                          pendency.status === "resolved"
                            ? "bg-success/10 text-success border-success/30"
                            : "bg-warning/10 text-warning border-warning/30"
                        }>
                          {pendency.status === "resolved" ? "Resolvida" : "Pendente"}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground">{pendency.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(pendency.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    {pendency.status === "pending" && (
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Resolver
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
