import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Clock,
  AlertCircle,
  MoreVertical,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useRole } from "@/contexts/RoleContext";

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
  isPmoValidated: boolean;
  isProcessActivity: boolean;
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
    points: 10,
    isPmoValidated: true,
    isProcessActivity: true
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
    points: 10,
    isPmoValidated: true,
    isProcessActivity: true
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
    points: 10,
    isPmoValidated: false,
    isProcessActivity: false
  },
  {
    id: "4",
    title: "Conferência de Medicamentos",
    description: "Verificar estoque e validade dos medicamentos",
    status: "pending",
    priority: "low",
    sector: "Farmácia",
    assignee: "Ana Lima",
    dueDate: "2025-12-01",
    points: 10,
    isPmoValidated: true,
    isProcessActivity: true
  },
  {
    id: "5",
    title: "Treinamento de Equipe",
    description: "Sessão de atualização sobre novos protocolos",
    status: "pending",
    priority: "medium",
    sector: "Emergência",
    assignee: "Carlos Mendes",
    dueDate: "2025-12-05",
    points: 0,
    isPmoValidated: false,
    isProcessActivity: false
  },
];

export default function Checklists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { role, rolePermissions, userSector } = useRole();

  const getSubtitle = () => {
    switch (role) {
      case "pmo": return "Validar e gerenciar checklists de todos os setores";
      case "coordinator": return `Gerencie o checklist do setor ${userSector}`;
      case "collaborator": return "Visualize e complete suas atividades";
    }
  };

  // Filter checklists based on role
  const filteredChecklists = mockChecklists.filter(checklist => {
    if (role === "pmo") return true;
    if (role === "coordinator") return checklist.sector === userSector || checklist.sector === "Cardiologia";
    return checklist.assignee === "João Silva"; // Collaborator sees only their tasks
  });

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
    <AppLayout title="Checklists" subtitle={getSubtitle()}>
      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-2">
            {rolePermissions.canImportChecklists && (
              <>
                <Button variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Importar
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </Button>
              </>
            )}
          </div>
          {(role === "pmo" || role === "coordinator") && (
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
              Nova Atividade
              {role === "coordinator" && <Badge className="ml-1 bg-gold text-gold-foreground">+100 pts</Badge>}
            </Button>
          )}
        </div>

        {/* PMO Validation Section */}
        {role === "pmo" && (
          <Card className="p-6 border-gold/30 bg-gold/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gold">
              <CheckCircle2 className="w-5 h-5" />
              Atividades Pendentes de Validação
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Marque as atividades como "Atividade do Processo" para que sejam elegíveis para pontuação (+10 pts cada).
            </p>
            <div className="space-y-3">
              {mockChecklists.filter(c => !c.isPmoValidated).map(checklist => (
                <div key={checklist.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">{checklist.title}</span>
                      <Badge variant="outline">{checklist.sector}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{checklist.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-success border-success/30 hover:bg-success/10">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Validar
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar atividades..."
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
            <TabsTrigger value="all">Todos ({filteredChecklists.length})</TabsTrigger>
            <TabsTrigger value="pending">
              Pendentes ({filteredChecklists.filter(c => c.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              Em Andamento ({filteredChecklists.filter(c => c.status === "in-progress").length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Concluídos ({filteredChecklists.filter(c => c.status === "completed").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {filteredChecklists.map((checklist) => (
                <Card key={checklist.id} className="p-6 hover:border-primary/50 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {role === "collaborator" && checklist.status === "pending" ? (
                        <button className="mt-1 w-6 h-6 rounded-full border-2 border-muted-foreground hover:border-primary hover:bg-primary/10 transition-all" />
                      ) : (
                        getStatusIcon(checklist.status)
                      )}
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-foreground">
                              {checklist.title}
                            </h3>
                            {checklist.isProcessActivity && (
                              <Badge className="bg-primary/10 text-primary border-primary/30 text-xs">
                                Atividade do Processo
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {checklist.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {getStatusBadge(checklist.status)}
                          {getPriorityBadge(checklist.priority)}
                          {role === "pmo" && <Badge variant="outline">{checklist.sector}</Badge>}
                          <span className="text-sm text-muted-foreground">
                            Responsável: {checklist.assignee}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Prazo: {new Date(checklist.dueDate).toLocaleDateString('pt-BR')}
                          </span>
                          {checklist.isProcessActivity && (
                            <Badge className="bg-success/10 text-success border-success/30">
                              +{checklist.points} pts
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {role === "collaborator" && checklist.status === "pending" && (
                        <Button size="sm" className="bg-success hover:bg-success/90">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Validar
                        </Button>
                      )}
                      {role === "coordinator" && (
                        <>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {role === "pmo" && (
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
