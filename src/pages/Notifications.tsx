import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Bell,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Trophy,
  Calendar,
  MessageSquare,
  Settings,
  Trash2
} from "lucide-react";

interface Notification {
  id: string;
  type: "error" | "success" | "ranking" | "task" | "message";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "error",
    title: "Erro na Coleta de Material",
    description: "Erro reportado no setor de Laboratório por João Silva",
    timestamp: "2025-11-26T10:30:00",
    read: false,
    priority: "high"
  },
  {
    id: "2",
    type: "ranking",
    title: "Novo 1º Lugar no Ranking!",
    description: "O setor de Cardiologia assumiu a primeira posição",
    timestamp: "2025-11-26T09:15:00",
    read: false,
    priority: "medium"
  },
  {
    id: "3",
    type: "success",
    title: "Checklist Concluído",
    description: "Verificação de Equipamentos foi concluída com sucesso",
    timestamp: "2025-11-26T08:45:00",
    read: true,
    priority: "low"
  },
  {
    id: "4",
    type: "task",
    title: "Nova Tarefa Atribuída",
    description: "Você foi designado para Auditoria de Prontuários",
    timestamp: "2025-11-25T16:20:00",
    read: true,
    priority: "medium"
  },
  {
    id: "5",
    type: "message",
    title: "Mensagem da Coordenação",
    description: "Reunião agendada para discussão dos resultados do mês",
    timestamp: "2025-11-25T14:00:00",
    read: true,
    priority: "low"
  },
  {
    id: "6",
    type: "error",
    title: "Prazo Próximo do Vencimento",
    description: "Tarefa 'Limpeza e Esterilização' vence em 2 dias",
    timestamp: "2025-11-25T10:00:00",
    read: true,
    priority: "high"
  },
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");

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
      message: "bg-secondary/10 text-secondary-foreground border-secondary/30"
    };
    const labels = {
      error: "Erro",
      success: "Sucesso",
      ranking: "Ranking",
      task: "Tarefa",
      message: "Mensagem"
    };
    return (
      <Badge variant="outline" className={variants[type as keyof typeof variants]}>
        {labels[type as keyof typeof labels]}
      </Badge>
    );
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
              <h1 className="text-3xl font-bold text-foreground">Notificações</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} notificação${unreadCount !== 1 ? 'ões' : ''} não lida${unreadCount !== 1 ? 's' : ''}` : 'Todas as notificações lidas'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Marcar Todas como Lidas
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

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
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alta Prioridade</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockNotifications.filter(n => n.priority === "high").length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Todas ({mockNotifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Não Lidas ({unreadCount})</TabsTrigger>
            <TabsTrigger value="error">Erros</TabsTrigger>
            <TabsTrigger value="ranking">Ranking</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-3">
              {mockNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`p-5 hover:border-primary/50 transition-all ${
                    !notification.read ? 'border-primary/30 bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      notification.type === "error" ? "bg-destructive/10" :
                      notification.type === "success" ? "bg-success/10" :
                      notification.type === "ranking" ? "bg-gold/10" :
                      notification.type === "task" ? "bg-primary/10" :
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
                          <div className="flex items-center gap-3">
                            {getNotificationBadge(notification.type)}
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
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
