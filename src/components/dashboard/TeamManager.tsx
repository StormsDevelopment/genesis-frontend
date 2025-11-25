import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Mail, MoreVertical } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "coordinator" | "collaborator";
  status: "active" | "inactive";
  tasksCompleted: number;
  totalTasks: number;
  points: number;
}

const mockTeamData: TeamMember[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@hospital.com",
    role: "collaborator",
    status: "active",
    tasksCompleted: 127,
    totalTasks: 135,
    points: 1270,
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@hospital.com",
    role: "collaborator",
    status: "active",
    tasksCompleted: 98,
    totalTasks: 102,
    points: 980,
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro.costa@hospital.com",
    role: "collaborator",
    status: "active",
    tasksCompleted: 156,
    totalTasks: 160,
    points: 1560,
  },
  {
    id: "4",
    name: "Ana Lima",
    email: "ana.lima@hospital.com",
    role: "collaborator",
    status: "inactive",
    tasksCompleted: 45,
    totalTasks: 78,
    points: 450,
  },
];

export const TeamManager = () => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getCompletionRate = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">Equipe do Setor</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {mockTeamData.filter(m => m.status === "active").length} membros ativos
          </p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Adicionar Membro
        </Button>
      </div>

      <div className="space-y-3">
        {mockTeamData.map((member) => {
          const completionRate = getCompletionRate(member.tasksCompleted, member.totalTasks);
          
          return (
            <div
              key={member.id}
              className="p-4 rounded-lg border-2 border-border bg-card hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12 bg-gradient-to-br from-primary to-secondary">
                  <AvatarFallback className="bg-transparent text-primary-foreground font-semibold">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{member.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={member.status === "active" ? "bg-success/10 text-success border-success/30" : "bg-muted text-muted-foreground"}
                        >
                          {member.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span>{member.email}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Tarefas</p>
                      <p className="text-sm font-semibold text-foreground">
                        {member.tasksCompleted}/{member.totalTasks}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Taxa de Conclusão</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                            style={{ width: `${completionRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{completionRate}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Pontos</p>
                      <Badge className="bg-primary/10 text-primary border-primary/30 font-bold">
                        {member.points}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
