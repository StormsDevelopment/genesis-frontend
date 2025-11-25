import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Trophy, AlertTriangle, Plus, Star } from "lucide-react";

interface Activity {
  id: string;
  type: "validation" | "vital" | "audit" | "notification";
  sector: string;
  description: string;
  points: number;
  timestamp: string;
  user?: string;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "validation",
    sector: "Cardiologia",
    description: "Atividade 'Verificação de Equipamentos' concluída",
    points: 10,
    timestamp: "Há 5 minutos",
    user: "João Silva",
  },
  {
    id: "2",
    type: "vital",
    sector: "UTI",
    description: "Nova atividade adicionada ao checklist: 'Protocolo de Sedação'",
    points: 100,
    timestamp: "Há 15 minutos",
    user: "Maria Santos",
  },
  {
    id: "3",
    type: "audit",
    sector: "Radiologia",
    description: "Erro identificado no setor de Ortopedia",
    points: 50,
    timestamp: "Há 32 minutos",
    user: "Pedro Costa",
  },
  {
    id: "4",
    type: "notification",
    sector: "Farmácia",
    description: "Notificação de Ausência recebida",
    points: -100,
    timestamp: "Há 1 hora",
  },
  {
    id: "5",
    type: "validation",
    sector: "Emergência",
    description: "Atividade 'Inventário de Medicamentos' concluída",
    points: 10,
    timestamp: "Há 2 horas",
    user: "Ana Lima",
  },
  {
    id: "6",
    type: "audit",
    sector: "Laboratório",
    description: "Auditoria realizada com sucesso",
    points: 50,
    timestamp: "Há 3 horas",
    user: "Carlos Souza",
  },
];

export const ActivityFeed = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "validation":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "vital":
        return <Star className="w-5 h-5 text-gold" />;
      case "audit":
        return <Trophy className="w-5 h-5 text-primary" />;
      case "notification":
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      default:
        return <Plus className="w-5 h-5" />;
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case "validation":
        return "Atividade Validada";
      case "vital":
        return "Pontos Vitais";
      case "audit":
        return "Auditoria";
      case "notification":
        return "Notificação";
      default:
        return "Atividade";
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground">Atividade Recente</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Últimas ações registradas no sistema
        </p>
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity, index) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>
              {index < mockActivities.length - 1 && (
                <div className="absolute left-1/2 top-10 w-0.5 h-8 bg-border -translate-x-1/2" />
              )}
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {getActivityLabel(activity.type)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{activity.sector}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  {activity.user && (
                    <p className="text-xs text-muted-foreground mt-1">Por: {activity.user}</p>
                  )}
                </div>
                <Badge className={`${activity.points > 0 ? "bg-success" : "bg-destructive"} text-white font-bold flex-shrink-0`}>
                  {activity.points > 0 ? "+" : ""}{activity.points}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
