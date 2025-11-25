import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, XCircle, Clock, Image } from "lucide-react";

interface Notification {
  id: string;
  type: "alert" | "absence" | "aggravation" | "audit";
  fromSector: string;
  toSector?: string;
  description: string;
  points: number;
  status: "pending" | "accepted" | "disputed" | "judged";
  timestamp: string;
  evidence?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "absence",
    fromSector: "Emergência",
    toSector: "Farmácia",
    description: "Falta de verificação de estoque de medicamentos de emergência no turno noturno",
    points: -100,
    status: "pending",
    timestamp: "Há 2 horas",
    evidence: true,
  },
  {
    id: "2",
    type: "alert",
    fromSector: "UTI",
    toSector: "Cardiologia",
    description: "Equipamento de monitoramento cardíaco não calibrado conforme protocolo",
    points: -50,
    status: "disputed",
    timestamp: "Há 5 horas",
  },
  {
    id: "3",
    type: "audit",
    fromSector: "Radiologia",
    description: "Identificação de não conformidade no setor de Ortopedia",
    points: 50,
    status: "accepted",
    timestamp: "Ontem, 14:30",
    evidence: true,
  },
  {
    id: "4",
    type: "aggravation",
    fromSector: "PMO",
    toSector: "Laboratório",
    description: "Terceira ocorrência de atraso na entrega de resultados em 30 dias",
    points: -150,
    status: "judged",
    timestamp: "2 dias atrás",
  },
];

interface NotificationPanelProps {
  role: "pmo" | "coordinator";
}

export const NotificationPanel = ({ role }: NotificationPanelProps) => {
  const getTypeInfo = (type: string) => {
    switch (type) {
      case "alert":
        return { 
          label: "Notificação de Alerta", 
          color: "bg-warning/10 text-warning border-warning/30",
          icon: <AlertTriangle className="w-4 h-4" />
        };
      case "absence":
        return { 
          label: "Notificação de Ausência", 
          color: "bg-destructive/10 text-destructive border-destructive/30",
          icon: <XCircle className="w-4 h-4" />
        };
      case "aggravation":
        return { 
          label: "Notificação de Agravamento", 
          color: "bg-destructive text-destructive-foreground",
          icon: <AlertTriangle className="w-4 h-4 fill-current" />
        };
      case "audit":
        return { 
          label: "Pontos de Auditoria", 
          color: "bg-primary/10 text-primary border-primary/30",
          icon: <CheckCircle2 className="w-4 h-4" />
        };
      default:
        return { 
          label: "Notificação", 
          color: "bg-muted text-foreground",
          icon: <AlertTriangle className="w-4 h-4" />
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="gap-1"><Clock className="w-3 h-3" />Pendente</Badge>;
      case "accepted":
        return <Badge className="bg-success text-success-foreground gap-1"><CheckCircle2 className="w-3 h-3" />Aceito</Badge>;
      case "disputed":
        return <Badge className="bg-warning text-warning-foreground gap-1"><AlertTriangle className="w-3 h-3" />Em Disputa</Badge>;
      case "judged":
        return <Badge className="bg-muted text-foreground gap-1">Julgado</Badge>;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {role === "pmo" ? "Gestão de Notificações" : "Notificações Recebidas"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {mockNotifications.filter(n => n.status === "pending").length} notificações pendentes
          </p>
        </div>
        {role === "coordinator" && (
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <AlertTriangle className="w-4 h-4" />
            Notificar Erro
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {mockNotifications.map((notification) => {
          const typeInfo = getTypeInfo(notification.type);
          
          return (
            <div
              key={notification.id}
              className="p-4 rounded-lg border-2 border-border bg-card hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={typeInfo.color} variant="outline">
                        {typeInfo.icon}
                        {typeInfo.label}
                      </Badge>
                      {getStatusBadge(notification.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${notification.points > 0 ? "bg-success" : "bg-destructive"} text-white font-bold`}>
                        {notification.points > 0 ? "+" : ""}{notification.points}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span className="font-medium text-foreground">{notification.fromSector}</span>
                      {notification.toSector && (
                        <>
                          <span>→</span>
                          <span className="font-medium text-foreground">{notification.toSector}</span>
                        </>
                      )}
                      <span className="ml-auto">{notification.timestamp}</span>
                    </div>
                    <p className="text-foreground">{notification.description}</p>
                  </div>

                  {notification.evidence && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Image className="w-4 h-4" />
                      <span>Evidência anexada</span>
                    </div>
                  )}

                  {notification.status === "pending" && (
                    <div className="flex items-center gap-2 pt-2">
                      {role === "pmo" ? (
                        <>
                          <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                            Validar
                          </Button>
                          <Button size="sm" variant="destructive">
                            Rejeitar
                          </Button>
                          <Button size="sm" variant="outline">
                            Ver Detalhes
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                            Reconhecer Falha
                          </Button>
                          <Button size="sm" variant="destructive">
                            Discordar
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
