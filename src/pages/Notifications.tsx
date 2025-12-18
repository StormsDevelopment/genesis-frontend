import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Trophy,
  Calendar,
  MessageSquare,
  Settings,
  Trash2,
  Plus,
  Send,
  Upload,
  Gavel
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useRole } from "@/contexts/RoleContext";

interface Notification {
  id: string;
  type: "error" | "success" | "ranking" | "task" | "message" | "dispute";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
  fromSector?: string;
  toSector?: string;
  errorType?: "alert" | "absence" | "aggravation";
  points?: number;
  status?: "pending" | "accepted" | "disputed";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "error",
    title: "Erro na Coleta de Material",
    description: "Erro reportado no setor de Laboratório por UTI - Material não etiquetado corretamente",
    timestamp: "2025-12-17T10:30:00",
    read: false,
    priority: "high",
    fromSector: "UTI",
    toSector: "Laboratório",
    errorType: "alert",
    points: -50,
    status: "pending"
  },
  {
    id: "2",
    type: "dispute",
    title: "Disputa Aberta",
    description: "Cardiologia contestou notificação de erro sobre atraso de exames",
    timestamp: "2025-12-17T09:15:00",
    read: false,
    priority: "high",
    fromSector: "Cardiologia",
    toSector: "Laboratório",
    status: "disputed"
  },
  {
    id: "3",
    type: "ranking",
    title: "Novo 1º Lugar no Ranking!",
    description: "O setor de Cardiologia assumiu a primeira posição com 3,845 pontos",
    timestamp: "2025-12-16T09:15:00",
    read: false,
    priority: "medium"
  },
  {
    id: "4",
    type: "success",
    title: "Checklist Concluído",
    description: "Verificação de Equipamentos foi concluída com sucesso (+10 pts)",
    timestamp: "2025-12-16T08:45:00",
    read: true,
    priority: "low",
    points: 10
  },
  {
    id: "5",
    type: "task",
    title: "Nova Tarefa Atribuída",
    description: "Você foi designado para Auditoria de Prontuários",
    timestamp: "2025-12-15T16:20:00",
    read: true,
    priority: "medium"
  },
  {
    id: "6",
    type: "error",
    title: "Notificação de Ausência Recebida",
    description: "Seu setor foi notificado: 'Protocolo de higienização não consta no checklist'",
    timestamp: "2025-12-15T14:00:00",
    read: true,
    priority: "high",
    fromSector: "Emergência",
    toSector: "Cardiologia",
    errorType: "absence",
    points: -100,
    status: "accepted"
  },
];

const sectors = [
  "UTI", "Cardiologia", "Emergência", "Laboratório", "Farmácia",
  "Pediatria", "Ortopedia", "Centro Cirúrgico", "Radiologia"
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedSector, setSelectedSector] = useState("");
  const [errorType, setErrorType] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const { role, rolePermissions, userSector } = useRole();

  const getSubtitle = () => {
    switch (role) {
      case "pmo": return "Todas as notificações e disputas pendentes";
      case "coordinator": return "Notificações do setor e erros reportados";
      case "collaborator": return "Suas notificações e tarefas";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "ranking":
        return <Trophy className="w-5 h-5 text-gold" />;
      case "task":
        return <Calendar className="w-5 h-5 text-primary" />;
      case "message":
        return <MessageSquare className="w-5 h-5 text-secondary-foreground" />;
      case "dispute":
        return <Gavel className="w-5 h-5 text-warning" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    const variants = {
      error: "bg-destructive/10 text-destructive border-destructive/30",
      success: "bg-success/10 text-success border-success/30",
      ranking: "bg-gold/10 text-gold border-gold/30",
      task: "bg-primary/10 text-primary border-primary/30",
      message: "bg-secondary/10 text-secondary-foreground border-secondary/30",
      dispute: "bg-warning/10 text-warning border-warning/30"
    };
    const labels = {
      error: "Erro",
      success: "Sucesso",
      ranking: "Ranking",
      task: "Tarefa",
      message: "Mensagem",
      dispute: "Disputa"
    };
    return (
      <Badge variant="outline" className={variants[type as keyof typeof variants]}>
        {labels[type as keyof typeof labels]}
      </Badge>
    );
  };

  const getErrorTypeBadge = (errorType: string) => {
    const variants = {
      alert: { class: "bg-warning/10 text-warning border-warning/30", label: "Alerta (-50 pts)" },
      absence: { class: "bg-destructive/10 text-destructive border-destructive/30", label: "Ausência (-100 pts)" },
      aggravation: { class: "bg-destructive/20 text-destructive border-destructive/50", label: "Agravamento (-150 pts)" }
    };
    const variant = variants[errorType as keyof typeof variants];
    return variant ? (
      <Badge variant="outline" className={variant.class}>
        {variant.label}
      </Badge>
    ) : null;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `há ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
    } else if (diffHours < 24) {
      return `há ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
    } else if (diffDays < 7) {
      return `há ${diffDays} dia${diffDays !== 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const disputeCount = mockNotifications.filter(n => n.status === "disputed" || n.status === "pending").length;

  return (
    <AppLayout title="Notificações" subtitle={getSubtitle()}>
      <div className="p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-foreground">{mockNotifications.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Não Lidas</p>
                <p className="text-2xl font-bold text-foreground">{unreadCount}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Gavel className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Disputas/Pendentes</p>
                <p className="text-2xl font-bold text-foreground">{disputeCount}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <Trophy className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ranking</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockNotifications.filter(n => n.type === "ranking").length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>

          <div className="flex flex-row pb-2 justify-between">
            <TabsList>
              <TabsTrigger value="all">Todas ({mockNotifications.length})</TabsTrigger>
              <TabsTrigger value="unread">Não Lidas ({unreadCount})</TabsTrigger>
              <TabsTrigger value="errors">Erros</TabsTrigger>
              {(role === "pmo" || role === "coordinator") && (
                <TabsTrigger value="disputes">Disputas ({disputeCount})</TabsTrigger>
              )}
            </TabsList>

            {rolePermissions.canReportErrors && (
              <Button
                className="gap-2 bg-destructive hover:bg-destructive/90"
                onClick={() => setShowReportForm(!showReportForm)}
              >
                <AlertCircle className="w-4 h-4" />
                Reportar Erro
                <Badge className="ml-1 bg-success text-success-foreground">+50 pts</Badge>
              </Button>
            )}
          </div>

            {/* Report Error Form */}
            {showReportForm && (
              <Card className="p-6 border-destructive/30 bg-destructive/5">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-5 h-5" />
                  Reportar Erro em Outro Setor
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ao reportar um erro, seu setor ganha +50 pontos de auditoria. O setor notificado pode reconhecer a falha ou contestar (disputa será julgada pelo PMO).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Setor Notificado</label>
                    <Select value={selectedSector} onValueChange={setSelectedSector}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o setor" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.filter(s => s !== userSector && s !== "Cardiologia").map(sector => (
                          <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Tipo de Erro</label>
                    <Select value={errorType} onValueChange={setErrorType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alert">Alerta - Erro já estava no checklist (-50 pts)</SelectItem>
                        <SelectItem value="absence">Ausência - Erro não estava no checklist (-100 pts)</SelectItem>
                        <SelectItem value="aggravation">Agravamento - Erro recorrente (-150 pts)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Descrição do Erro</label>
                  <Textarea
                    placeholder="Descreva detalhadamente o erro encontrado..."
                    value={errorDescription}
                    onChange={(e) => setErrorDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Evidência (opcional)</label>
                  <Button variant="outline" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Anexar Arquivo
                  </Button>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowReportForm(false)}>
                    Cancelar
                  </Button>
                  <Button className="gap-2 bg-destructive hover:bg-destructive/90">
                    <Send className="w-4 h-4" />
                    Enviar Notificação
                  </Button>
                </div>
              </Card>
            )}

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-3">
              {mockNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`p-5 hover:border-primary/50 transition-all ${!notification.read ? 'border-primary/30 bg-primary/5' : ''
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${notification.type === "error" ? "bg-destructive/10" :
                      notification.type === "success" ? "bg-success/10" :
                        notification.type === "ranking" ? "bg-gold/10" :
                          notification.type === "task" ? "bg-primary/10" :
                            notification.type === "dispute" ? "bg-warning/10" :
                              "bg-secondary/10"
                      }`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-3">
                            {getNotificationBadge(notification.type)}
                            {notification.errorType && getErrorTypeBadge(notification.errorType)}
                            {notification.points && (
                              <Badge variant="outline" className={
                                notification.points > 0
                                  ? "bg-success/10 text-success border-success/30"
                                  : "bg-destructive/10 text-destructive border-destructive/30"
                              }>
                                {notification.points > 0 ? `+${notification.points}` : notification.points} pts
                              </Badge>
                            )}
                            {notification.status && (
                              <Badge variant="outline" className={
                                notification.status === "pending" ? "bg-warning/10 text-warning border-warning/30" :
                                  notification.status === "disputed" ? "bg-destructive/10 text-destructive border-destructive/30" :
                                    "bg-success/10 text-success border-success/30"
                              }>
                                {notification.status === "pending" ? "Pendente" :
                                  notification.status === "disputed" ? "Em Disputa" : "Aceito"}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {notification.status === "pending" && role !== "pmo" && (
                            <>
                              <Button size="sm" variant="outline" className="text-success border-success/30 hover:bg-success/10">
                                Reconhecer
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                                Contestar
                              </Button>
                            </>
                          )}
                          {notification.status === "disputed" && role === "pmo" && (
                            <>
                              <Button size="sm" variant="outline" className="text-success border-success/30 hover:bg-success/10">
                                Aprovar
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                                Rejeitar
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
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
