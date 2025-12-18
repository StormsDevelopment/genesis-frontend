import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Mail, 
  Phone,
  MoreVertical,
  TrendingUp,
  Award,
  Target,
  Users,
  Building2,
  UserPlus,
  Settings
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useRole } from "@/contexts/RoleContext";

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

interface Sector {
  id: string;
  name: string;
  coordinator: string;
  membersCount: number;
  score: number;
  completionRate: number;
  status: "active" | "inactive";
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@hospital.com",
    phone: "(11) 98765-4321",
    role: "collaborator",
    sector: "Cardiologia",
    status: "active",
    tasksCompleted: 127,
    totalTasks: 135,
    points: 1270,
    level: 5,
    joinDate: "2024-01-15"
  },
  {
    id: "2",
    name: "Ana Oliveira",
    email: "ana.oliveira@hospital.com",
    phone: "(11) 98765-4322",
    role: "collaborator",
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
    sector: "Cardiologia",
    status: "active",
    tasksCompleted: 156,
    totalTasks: 160,
    points: 1560,
    level: 6,
    joinDate: "2023-11-10"
  },
  {
    id: "4",
    name: "Lucia Ferreira",
    email: "lucia.ferreira@hospital.com",
    phone: "(11) 98765-4324",
    role: "collaborator",
    sector: "Cardiologia",
    status: "inactive",
    tasksCompleted: 45,
    totalTasks: 78,
    points: 450,
    level: 2,
    joinDate: "2024-08-05"
  },
];

const mockSectors: Sector[] = [
  { id: "1", name: "Ambulatório", coordinator: "Dra. Maria Santos", membersCount: 15, score: 3845, completionRate: 94, status: "active" },
  { id: "2", name: "Atendimento PS", coordinator: "Dr. Paulo Lima", membersCount: 22, score: 3720, completionRate: 91, status: "active" },
  { id: "3", name: "Central de Autorização", coordinator: "Dra. Clara Mendes", membersCount: 28, score: 3580, completionRate: 88, status: "active" },
  { id: "4", name: "Central de Internação", coordinator: "Dr. Ricardo Alves", membersCount: 12, score: 3420, completionRate: 95, status: "active" },
  { id: "5", name: "Centro Cirúrgico", coordinator: "Dra. Fernanda Dias", membersCount: 10, score: 3210, completionRate: 93, status: "active" },
  { id: "6", name: "Centro Diagnóstico", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "7", name: "Controladoria", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "8", name: "Farmácia e Suprimentos", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "9", name: "Faturamento", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "10", name: "Financeiro", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "11", name: "Gestão de Leitos", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "12", name: "Higienização", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "13", name: "Hotelaria", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "14", name: "IRT", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "15", name: "Laboratório", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "16", name: "Nutrição", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "17", name: "Oncologia", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "18", name: "Pediatria", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "19", name: "Pré-Faturamento", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "20", name: "Pronto-Socorro", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "21", name: "Regra de Negócios", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "21", name: "Transporte", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "22", name: "Unidade de Internação", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "23", name: "UTI Adulto", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
  { id: "24", name: "UTINP", coordinator: "Dr. Marcos Souza", membersCount: 18, score: 2980, completionRate: 89, status: "active" },
];

export default function Teams() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("members");
  const { role, rolePermissions, userSector } = useRole();

  const getSubtitle = () => {
    switch (role) {
      case "pmo": return "Gerencie todos os setores e usuários";
      case "coordinator": return `Gerencie sua equipe do setor ${userSector}`;
      default: return "Visualize membros da equipe";
    }
  };

  // Filter based on role
  const filteredMembers = role === "pmo" 
    ? mockTeamMembers 
    : mockTeamMembers.filter(m => m.sector === userSector || m.sector === "Cardiologia");

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getCompletionRate = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  const getRoleBadge = (memberRole: string) => {
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
      <Badge variant="outline" className={variants[memberRole as keyof typeof variants]}>
        {labels[memberRole as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <AppLayout title="Equipes" subtitle={getSubtitle()}>
      <div className="p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {role === "pmo" && (
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Building2 className="w-4 h-4" />
                Novo Setor
              </Button>
            )}
          </div>
          {(role === "pmo" || role === "coordinator") && (
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <UserPlus className="w-4 h-4" />
              {role === "coordinator" ? "Adicionar Colaborador" : "Adicionar Usuário"}
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {role === "pmo" ? "Total de Membros" : "Membros da Equipe"}
                </p>
                <p className="text-2xl font-bold text-foreground">{filteredMembers.length}</p>
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
                  {filteredMembers.filter(m => m.status === "active").length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gold/10">
                <Award className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pontos Totais</p>
                <p className="text-2xl font-bold text-foreground">
                  {filteredMembers.reduce((acc, m) => acc + m.points, 0).toLocaleString()}
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
                <p className="text-sm text-muted-foreground">
                  {role === "pmo" ? "Setores Ativos" : "Taxa Média"}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {role === "pmo" ? mockSectors.filter(s => s.status === "active").length : "94%"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={role === "pmo" ? "Buscar membros ou setores..." : "Buscar membros da equipe..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="members">
              {role === "coordinator" ? "Minha Equipe" : "Membros"}
            </TabsTrigger>
            {role === "pmo" && <TabsTrigger value="sectors">Setores</TabsTrigger>}
            {role === "pmo" && <TabsTrigger value="coordinators">Coordenadores</TabsTrigger>}
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredMembers.map((member) => {
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
                          {(role === "pmo" || role === "coordinator") && (
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          )}
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

                        {role === "coordinator" && (
                          <div className="flex gap-2 pt-3">
                            <Button size="sm" variant="outline" className="flex-1">
                              Atribuir Tarefa
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Sectors Tab (PMO Only) */}
          {role === "pmo" && (
            <TabsContent value="sectors" className="mt-6">
              <div className="space-y-4">
                {mockSectors.map((sector, index) => (
                  <Card key={sector.id} className="p-6 hover:border-primary/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? "bg-gradient-to-r from-gold to-warning text-gold-foreground" :
                          index === 1 ? "bg-gradient-to-r from-muted to-border text-foreground" :
                          index === 2 ? "bg-gradient-to-r from-amber-700 to-amber-500 text-white" :
                          "bg-muted text-foreground"
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{sector.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Coordenador: {sector.coordinator}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Membros</p>
                          <p className="text-lg font-bold text-foreground">{sector.membersCount}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Taxa</p>
                          <p className="text-lg font-bold text-foreground">{sector.completionRate}%</p>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/30 font-bold text-lg px-3 py-1">
                          {sector.score} pts
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}

          {/* Coordinators Tab (PMO Only) */}
          {role === "pmo" && (
            <TabsContent value="coordinators" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {mockSectors.map((sector) => (
                  <Card key={sector.id} className="p-6 hover:border-primary/50 transition-all">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-14 h-14 bg-gradient-to-br from-primary to-secondary">
                        <AvatarFallback className="bg-transparent text-primary-foreground font-semibold">
                          {sector.coordinator.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {sector.coordinator}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                            Coordenador
                          </Badge>
                          <Badge variant="outline">{sector.name}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
                          <div>
                            <p className="text-xs text-muted-foreground">Equipe</p>
                            <p className="font-semibold text-foreground">{sector.membersCount}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Score</p>
                            <p className="font-semibold text-primary">{sector.score}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Taxa</p>
                            <p className="font-semibold text-foreground">{sector.completionRate}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
}
