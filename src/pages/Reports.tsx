import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Download,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Award,
  BarChart3,
  Calendar,
  Filter
} from "lucide-react";

export default function Reports() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
              <p className="text-muted-foreground">Análises e insights da plataforma</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Período
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
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
            <p className="text-3xl font-bold text-foreground">1,247</p>
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
            <p className="text-3xl font-bold text-foreground">28,450</p>
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
            <p className="text-3xl font-bold text-foreground">23</p>
            <p className="text-xs text-muted-foreground mt-1">vs. mês anterior</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="sectors">Por Setor</TabsTrigger>
            <TabsTrigger value="team">Desempenho da Equipe</TabsTrigger>
            <TabsTrigger value="errors">Análise de Erros</TabsTrigger>
          </TabsList>

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

            {/* Top Sectors */}
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
          </TabsContent>

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

          <TabsContent value="team" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Desempenho Individual</h3>
              <div className="h-96 flex items-center justify-center bg-muted/30 rounded-lg border border-border">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Métricas de desempenho da equipe</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Análise de Erros</h3>
              <div className="h-96 flex items-center justify-center bg-muted/30 rounded-lg border border-border">
                <div className="text-center">
                  <TrendingDown className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Distribuição e análise de erros</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
