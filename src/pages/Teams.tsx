import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Mail, 
  Phone,
  MoreVertical,
  TrendingUp,
  Award,
  Target
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "pmo" | "coordinator" | "collaborator";
  sector: string;
  status: "active" | "inactive";
  tasksCompleted: number;
  totalTasks: number;
  points: number;
  level: number;
  joinDate: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@hospital.com",
    phone: "(11) 98765-4321",
    role: "collaborator",
    sector: "UTI",
    status: "active",
    tasksCompleted: 127,
    totalTasks: 135,
    points: 1270,
    level: 5,
    joinDate: "2024-01-15"
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@hospital.com",
    phone: "(11) 98765-4322",
    role: "coordinator",
    sector: "Cardiologia",
    status: "active",
    tasksCompleted: 98,
    totalTasks: 102,
    points: 980,
    level: 4,
    joinDate: "2024-02-20"
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro.costa@hospital.com",
    phone: "(11) 98765-4323",
    role: "collaborator",
    sector: "Emergência",
    status: "active",
    tasksCompleted: 156,
    totalTasks: 160,
    points: 1560,
    level: 6,
    joinDate: "2023-11-10"
  },
  {
    id: "4",
    name: "Ana Lima",
    email: "ana.lima@hospital.com",
    phone: "(11) 98765-4324",
    role: "collaborator",
    sector: "Pediatria",
    status: "inactive",
    tasksCompleted: 45,
    totalTasks: 78,
    points: 450,
    level: 2,
    joinDate: "2024-08-05"
  },
  {
    id: "5",
    name: "Carlos Mendes",
    email: "carlos.mendes@hospital.com",
    phone: "(11) 98765-4325",
    role: "pmo",
    sector: "Administração",
    status: "active",
    tasksCompleted: 203,
    totalTasks: 210,
    points: 2030,
    level: 8,
    joinDate: "2023-05-01"
  },
];

export default function Teams() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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

  const getRoleBadge = (role: string) => {
    const variants = {
      pmo: "bg-gold/10 text-gold border-gold/30",
      coordinator: "bg-primary/10 text-primary border-primary/30",
      collaborator: "bg-secondary/10 text-secondary-foreground border-secondary/30"
    };
    const labels = {
      pmo: "PMO",
      coordinator: "Coordenador",
      collaborator: "Colaborador"
    };
    return (
      <Badge variant="outline" className={variants[role as keyof typeof variants]}>
        {labels[role as keyof typeof labels]}
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
              <h1 className="text-3xl font-bold text-foreground">Equipes</h1>
              <p className="text-muted-foreground">Gerencie membros e setores</p>
            </div>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Adicionar Membro
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Membros</p>
                <p className="text-2xl font-bold text-foreground">{mockTeamMembers.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Membros Ativos</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockTeamMembers.filter(m => m.status === "active").length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Award className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pontos Totais</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockTeamMembers.reduce((acc, m) => acc + m.points, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Target className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taxa Média</p>
                <p className="text-2xl font-bold text-foreground">94%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar membros..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pmo">PMO</TabsTrigger>
            <TabsTrigger value="coordinator">Coordenadores</TabsTrigger>
            <TabsTrigger value="collaborator">Colaboradores</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockTeamMembers.map((member) => {
                const completionRate = getCompletionRate(member.tasksCompleted, member.totalTasks);
                
                return (
                  <Card key={member.id} className="p-6 hover:border-primary/50 transition-all">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16 bg-gradient-to-br from-primary to-secondary">
                        <AvatarFallback className="bg-transparent text-primary-foreground font-semibold text-lg">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                              {member.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              {getRoleBadge(member.role)}
                              <Badge 
                                variant="outline" 
                                className={member.status === "active" 
                                  ? "bg-success/10 text-success border-success/30" 
                                  : "bg-muted text-muted-foreground"}
                              >
                                {member.status === "active" ? "Ativo" : "Inativo"}
                              </Badge>
                              <Badge variant="outline">Nível {member.level}</Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            <span>{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            <span>{member.phone}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Setor</p>
                            <Badge variant="outline">{member.sector}</Badge>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Pontos</p>
                            <Badge className="bg-primary/10 text-primary border-primary/30 font-bold">
                              {member.points}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Tarefas</p>
                            <p className="text-sm font-semibold text-foreground">
                              {member.tasksCompleted}/{member.totalTasks}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Taxa</p>
                            <p className="text-sm font-semibold text-foreground">{completionRate}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
