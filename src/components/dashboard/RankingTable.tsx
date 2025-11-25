import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

const mockRankingData = [
  { id: 1, sector: "Cardiologia", score: 3845, change: 12, trend: "up", activities: 127, alerts: 2 },
  { id: 2, sector: "UTI", score: 3720, change: 8, trend: "up", activities: 115, alerts: 1 },
  { id: 3, sector: "Emergência", score: 3580, change: -5, trend: "down", activities: 142, alerts: 4 },
  { id: 4, sector: "Pediatria", score: 3420, change: 15, trend: "up", activities: 98, alerts: 1 },
  { id: 5, sector: "Ortopedia", score: 3210, change: 0, trend: "same", activities: 89, alerts: 3 },
  { id: 6, sector: "Radiologia", score: 3150, change: -3, trend: "down", activities: 76, alerts: 2 },
  { id: 7, sector: "Laboratório", score: 2980, change: 6, trend: "up", activities: 134, alerts: 1 },
  { id: 8, sector: "Farmácia", score: 2850, change: 4, trend: "up", activities: 92, alerts: 0 },
];

export const RankingTable = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-success" />;
      case "down": return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getRankBadge = (position: number) => {
    const colors = {
      1: "bg-gradient-to-r from-gold to-warning text-gold-foreground",
      2: "bg-gradient-to-r from-muted to-border text-foreground",
      3: "bg-gradient-to-r from-warning/30 to-warning/50 text-foreground",
    };
    return colors[position as keyof typeof colors] || "bg-muted text-foreground";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold" />
            Ranking de Setores
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Classificação por pontuação total</p>
        </div>
        <Badge variant="outline" className="gap-2">
          Atualizado há 5 min
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Posição</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Setor</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Pontuação</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">Variação</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Atividades</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">Alertas</th>
            </tr>
          </thead>
          <tbody>
            {mockRankingData.map((item) => (
              <tr key={item.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <Badge className={`${getRankBadge(item.id)} font-bold w-8 h-8 rounded-full flex items-center justify-center`}>
                    {item.id}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium text-foreground">{item.sector}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-lg font-bold text-foreground">{item.score.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-1">
                    {getTrendIcon(item.trend)}
                    <span className={`text-sm font-medium ${
                      item.trend === "up" ? "text-success" : 
                      item.trend === "down" ? "text-destructive" : 
                      "text-muted-foreground"
                    }`}>
                      {item.change > 0 ? "+" : ""}{item.change}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-foreground">{item.activities}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  {item.alerts > 0 ? (
                    <Badge variant="destructive" className="rounded-full px-2">
                      {item.alerts}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="rounded-full px-2 text-success border-success">
                      0
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
