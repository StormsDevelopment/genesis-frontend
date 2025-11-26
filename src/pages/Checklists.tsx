import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Clock,
  AlertCircle,
  MoreVertical,
  Download,
  Upload
} from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "overdue";
  priority: "low" | "medium" | "high";
  sector: string;
  assignee: string;
  dueDate: string;
  completedDate?: string;
  points: number;
}

const mockChecklists: ChecklistItem[] = [
  {
    id: "1",
    title: "Verificação de Equipamentos Médicos",
    description: "Inspeção completa de todos os equipamentos da UTI",
    status: "completed",
    priority: "high",
    sector: "UTI",
    assignee: "João Silva",
    dueDate: "2025-11-25",
    completedDate: "2025-11-25",
    points: 50
  },
  {
    id: "2",
    title: "Auditoria de Prontuários",
    description: "Revisar 20 prontuários aleatórios do mês anterior",
    status: "in-progress",
    priority: "medium",
    sector: "Cardiologia",
    assignee: "Maria Santos",
    dueDate: "2025-11-28",
    points: 30
  },
  {
    id: "3",
    title: "Limpeza e Esterilização",
    description: "Protocolo completo de limpeza das salas cirúrgicas",
    status: "overdue",
    priority: "high",
    sector: "Centro Cirúrgico",
    assignee: "Pedro Costa",
    dueDate: "2025-11-24",
    points: 40
  },
  {
    id: "4",
    title: "Treinamento de Equipe",
    description: "Sessão de atualização sobre novos protocolos",
    status: "pending",
    priority: "low",
    sector: "Emergência",
    assignee: "Ana Lima",
    dueDate: "2025-12-01",
    points: 20
  },
];

export default function Checklists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-warning" />;
      case "overdue":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-success/10 text-success border-success/30",
      "in-progress": "bg-warning/10 text-warning border-warning/30",
      overdue: "bg-destructive/10 text-destructive border-destructive/30",
      pending: "bg-muted text-muted-foreground border-border"
    };
    const labels = {
      completed: "Concluído",
      "in-progress": "Em Andamento",
      overdue: "Atrasado",
      pending: "Pendente"
    };
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-destructive/10 text-destructive border-destructive/30",
      medium: "bg-warning/10 text-warning border-warning/30",
      low: "bg-muted text-muted-foreground border-border"
    };
    const labels = {
      high: "Alta",
      medium: "Média",
      low: "Baixa"
    };
    return (
      <Badge variant="outline" className={variants[priority as keyof typeof variants]}>
        {labels[priority as keyof typeof labels]}
      </Badge>
    );
  };

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
              <h1 className="text-3xl font-bold text-foreground">Checklists</h1>
              <p className="text-muted-foreground">Gerencie todas as tarefas e verificações</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Importar
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
              Novo Checklist
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar checklists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Todos ({mockChecklists.length})</TabsTrigger>
            <TabsTrigger value="pending">
              Pendentes ({mockChecklists.filter(c => c.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              Em Andamento ({mockChecklists.filter(c => c.status === "in-progress").length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Concluídos ({mockChecklists.filter(c => c.status === "completed").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {mockChecklists.map((checklist) => (
                <Card key={checklist.id} className="p-6 hover:border-primary/50 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {getStatusIcon(checklist.status)}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {checklist.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {checklist.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {getStatusBadge(checklist.status)}
                          {getPriorityBadge(checklist.priority)}
                          <Badge variant="outline">{checklist.sector}</Badge>
                          <span className="text-sm text-muted-foreground">
                            Responsável: {checklist.assignee}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Prazo: {new Date(checklist.dueDate).toLocaleDateString('pt-BR')}
                          </span>
                          <Badge className="bg-primary/10 text-primary border-primary/30">
                            {checklist.points} pontos
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
