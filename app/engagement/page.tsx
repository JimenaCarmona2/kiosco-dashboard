"use client"

import { useState } from "react"
import {
  Clock,
  Eye,
  Layers,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  MessageSquare,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"

// Heatmap data: hours x days
const heatmapHours = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
const heatmapDays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]

const heatmapData: Record<string, Record<string, number>> = {
  Lun: { "08": 12, "09": 25, "10": 38, "11": 52, "12": 45, "13": 35, "14": 60, "15": 72, "16": 68, "17": 55, "18": 40, "19": 30, "20": 18 },
  Mar: { "08": 15, "09": 30, "10": 42, "11": 58, "12": 50, "13": 38, "14": 65, "15": 78, "16": 72, "17": 60, "18": 45, "19": 35, "20": 22 },
  Mie: { "08": 10, "09": 22, "10": 35, "11": 48, "12": 42, "13": 32, "14": 55, "15": 68, "16": 62, "17": 50, "18": 38, "19": 28, "20": 15 },
  Jue: { "08": 18, "09": 32, "10": 45, "11": 62, "12": 55, "13": 42, "14": 70, "15": 85, "16": 78, "17": 65, "18": 48, "19": 38, "20": 25 },
  Vie: { "08": 20, "09": 38, "10": 52, "11": 68, "12": 60, "13": 48, "14": 75, "15": 90, "16": 85, "17": 72, "18": 55, "19": 42, "20": 30 },
  Sab: { "08": 25, "09": 42, "10": 58, "11": 75, "12": 68, "13": 55, "14": 82, "15": 95, "16": 90, "17": 78, "18": 62, "19": 48, "20": 35 },
  Dom: { "08": 22, "09": 35, "10": 48, "11": 65, "12": 58, "13": 45, "14": 72, "15": 88, "16": 82, "17": 70, "18": 52, "19": 40, "20": 28 },
}

function getHeatColor(value: number): string {
  if (value >= 80) return "hsl(var(--chart-1))"
  if (value >= 60) return "hsl(174 72% 46% / 0.7)"
  if (value >= 40) return "hsl(174 72% 46% / 0.45)"
  if (value >= 20) return "hsl(174 72% 46% / 0.2)"
  return "hsl(174 72% 46% / 0.08)"
}

const sectionData = [
  { section: "Bienvenida", avgTime: 45, visits: 2100, engagement: 95 },
  { section: "Trivia Futbol", avgTime: 120, visits: 1850, engagement: 88 },
  { section: "Selfie Punto", avgTime: 95, visits: 1620, engagement: 82 },
  { section: "Info Sedes", avgTime: 68, visits: 1380, engagement: 72 },
  { section: "Chat Avatar IA", avgTime: 155, visits: 1200, engagement: 90 },
  { section: "Registro", avgTime: 38, visits: 634, engagement: 65 },
]

const radarData = [
  { section: "Bienvenida", value: 95 },
  { section: "Trivia", value: 88 },
  { section: "Selfie", value: 82 },
  { section: "Sedes", value: 72 },
  { section: "Avatar IA", value: 90 },
  { section: "Registro", value: 65 },
]

const engagementKpis = [
  {
    title: "Total Sessions",
    value: "2,170",
    change: "+15%",
    trend: "up" as const,
    icon: Eye,
  },
  {
    title: "Duracion Promedio",
    value: "2m 34s",
    change: "+12s",
    trend: "up" as const,
    icon: Clock,
  },
  {
    title: "Secciones / Sesion",
    value: "3.8",
    change: "+0.4",
    trend: "up" as const,
    icon: Layers,
  },
  {
    title: "Interaction Rate (IA)",
    value: "55.3%",
    change: "-2.1%",
    trend: "down" as const,
    icon: MessageSquare,
  },
]

function formatTime(seconds: number) {
  if (seconds >= 60) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}m ${s}s`
  }
  return `${seconds}s`
}

export default function EngagementPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Ultimos 7 dias")

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Engagement</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Heatmap de trafico, secciones y tiempos de interaccion
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-secondary border-border text-foreground hover:bg-muted">
              {selectedPeriod} <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedPeriod("Hoy")}>Hoy</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPeriod("Ultimos 7 dias")}>Ultimos 7 dias</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPeriod("Ultimos 30 dias")}>Ultimos 30 dias</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Engagement KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {engagementKpis.map((kpi, i) => (
          <Card key={i} className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <kpi.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    kpi.trend === "up" ? "text-chart-5" : "text-destructive"
                  }`}
                >
                  {kpi.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
              <div className="text-2xl font-semibold text-foreground">{kpi.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{kpi.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Heatmap */}
      <Card className="border-border bg-card mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">Heatmap de Trafico por Hora</CardTitle>
          <p className="text-xs text-muted-foreground">Distribucion de PRESENCE_DETECTED por dia y hora</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Hour labels */}
              <div className="flex gap-1 mb-1 ml-12">
                {heatmapHours.map((h) => (
                  <div key={h} className="flex-1 text-center text-[10px] text-muted-foreground font-mono">
                    {h}:00
                  </div>
                ))}
              </div>

              {/* Heatmap rows */}
              {heatmapDays.map((day) => (
                <div key={day} className="flex items-center gap-1 mb-1">
                  <div className="w-10 text-right text-xs text-muted-foreground font-medium mr-1">{day}</div>
                  {heatmapHours.map((hour) => {
                    const value = heatmapData[day]?.[hour] ?? 0
                    return (
                      <div
                        key={`${day}-${hour}`}
                        className="flex-1 h-8 rounded-sm flex items-center justify-center cursor-default transition-all hover:ring-1 hover:ring-primary/50"
                        style={{ backgroundColor: getHeatColor(value) }}
                        title={`${day} ${hour}:00 — ${value} presencias`}
                      >
                        <span className="text-[9px] font-mono text-foreground/80">{value}</span>
                      </div>
                    )
                  })}
                </div>
              ))}

              {/* Legend */}
              <div className="flex items-center gap-3 mt-3 ml-12">
                <span className="text-[10px] text-muted-foreground">Menos</span>
                <div className="flex gap-1">
                  {[0.08, 0.2, 0.45, 0.7, 1].map((opacity, i) => (
                    <div
                      key={i}
                      className="w-6 h-3 rounded-sm"
                      style={{ backgroundColor: `hsl(174 72% 46% / ${opacity})` }}
                    ></div>
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground">Mas</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Active Time by Section */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Tiempo Activo Promedio por Seccion</CardTitle>
            <p className="text-xs text-muted-foreground">Identifica secciones mas atractivas y friccion</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} unit="s" />
                  <YAxis
                    type="category"
                    dataKey="section"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    width={85}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [formatTime(value), "Tiempo promedio"]}
                  />
                  <Bar dataKey="avgTime" radius={[0, 4, 4, 0]}>
                    {sectionData.map((_entry, index) => (
                      <Cell
                        key={index}
                        fill={index % 2 === 0 ? "hsl(var(--chart-1))" : "hsl(var(--chart-4))"}
                        fillOpacity={0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radar engagement */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Perfil de Engagement por Seccion</CardTitle>
            <p className="text-xs text-muted-foreground">Indice de engagement relativo por area</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="section" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                  />
                  <Radar
                    name="Engagement"
                    dataKey="value"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section details table */}
      <Card className="border-border bg-card mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">Detalle de Secciones</CardTitle>
          <p className="text-xs text-muted-foreground">Metricas completas de cada seccion del kiosko</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Seccion</th>
                  <th className="text-right p-3 text-xs font-medium text-muted-foreground">Visitas</th>
                  <th className="text-right p-3 text-xs font-medium text-muted-foreground">Tiempo Promedio</th>
                  <th className="text-right p-3 text-xs font-medium text-muted-foreground">Engagement Index</th>
                  <th className="text-right p-3 text-xs font-medium text-muted-foreground">% del Total</th>
                </tr>
              </thead>
              <tbody>
                {sectionData.map((section, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-3 font-medium text-foreground">{section.section}</td>
                    <td className="p-3 text-right text-muted-foreground font-mono text-xs">{section.visits.toLocaleString()}</td>
                    <td className="p-3 text-right text-muted-foreground font-mono text-xs">{formatTime(section.avgTime)}</td>
                    <td className="p-3 text-right">
                      <Badge
                        variant="outline"
                        className={`text-xs font-mono ${
                          section.engagement >= 85
                            ? "border-chart-5/30 text-chart-5 bg-chart-5/10"
                            : section.engagement >= 70
                              ? "border-chart-1/30 text-chart-1 bg-chart-1/10"
                              : "border-chart-2/30 text-chart-2 bg-chart-2/10"
                        }`}
                      >
                        {section.engagement}%
                      </Badge>
                    </td>
                    <td className="p-3 text-right text-muted-foreground font-mono text-xs">
                      {((section.visits / sectionData[0].visits) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
